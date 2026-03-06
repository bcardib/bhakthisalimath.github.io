"use client";

import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Project } from "@/data/projects";
import { useProjectScale } from "./useProjectScale";
import { useViewportSize } from "./useViewportSize";

type ScatterLayout = { x: number; y: number; rotate: number };
type DragOffset = { x: number; y: number };

const MIN_CELL_WIDTH = 220;
const MIN_CELL_HEIGHT = 168;
const STAGE_PADDING = 80;
const BUFFER_TOP = 28;
const BUFFER_BOTTOM = 28;
const CARD_REF_WIDTH = 240;
const CARD_REF_HEIGHT = 168;

/**
 * Grid: rows and cols from how many cells fit without overlapping.
 * Cell size = content / count so grid fits; cards scale down when cell < ref size.
 */
function buildScatterLayout(
  count: number,
  availableWidth: number,
  availableHeight: number
): {
  layouts: ScatterLayout[];
  totalWidth: number;
  totalHeight: number;
  cardScale: number;
} {
  if (count <= 0)
    return { layouts: [], totalWidth: 0, totalHeight: 0, cardScale: 1 };
  const contentWidth = Math.max(0, availableWidth - STAGE_PADDING);
  const contentHeight = Math.max(
    0,
    availableHeight - STAGE_PADDING - BUFFER_TOP - BUFFER_BOTTOM
  );
  const maxCols = Math.max(1, Math.floor(contentWidth / MIN_CELL_WIDTH));
  const maxRows = Math.max(1, Math.floor(contentHeight / MIN_CELL_HEIGHT));
  const minColsForRows = Math.ceil(count / maxRows);
  const cols = Math.min(maxCols, Math.max(1, minColsForRows));
  const rows = Math.ceil(count / cols);
  const cellWidth = contentWidth / cols;
  const cellHeight = contentHeight / rows;
  const totalWidth = (cols - 1) * cellWidth;
  const totalHeight = (rows - 1) * cellHeight;
  const cardScale = Math.min(
    1,
    cellWidth / CARD_REF_WIDTH,
    cellHeight / CARD_REF_HEIGHT
  );
  const startX = -totalWidth / 2;
  const startY = -totalHeight / 2;
  const layouts: ScatterLayout[] = Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * cellWidth;
    const y = startY + row * cellHeight;
    const rotateDeg =
      (col - (cols - 1) / 2) * 0.6 + (row - (rows - 1) / 2) * 0.2;
    return { x, y, rotate: rotateDeg };
  });
  return { layouts, totalWidth, totalHeight, cardScale };
}

/** Generate stack offsets for the closed state so each card is slightly offset. */
function buildStackOffsets(count: number): number[] {
  return Array.from({ length: count }, (_, i) =>
    (i % 2 === 0 ? -1 : 1) * (2 + Math.floor(i / 2) * 2)
  );
}

type ScatterViewProps = {
  projects: Project[];
  selectedId: string | null;
  onSelect: (project: Project) => void;
  stageReady: boolean;
  fallbackAccent: string;
  expanded: boolean;
  onExpandChange: (expanded: boolean) => void;
};

export function ScatterView({
  projects,
  selectedId,
  onSelect,
  stageReady,
  fallbackAccent,
  expanded: isUnpacked,
  onExpandChange,
}: ScatterViewProps) {
  // Shared responsive scale used by both scatter and timeline views.
  const scatterScale = useProjectScale();
  const viewport = useViewportSize();
  const [dragOffsets, setDragOffsets] = useState<Record<string, DragOffset>>(
    {}
  );
  // Tracks current drag gesture for a card.
  const dragState = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  }>({
    id: null,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });
  const isDraggingRef = useRef(false);
  const skipClickRef = useRef(false);

  useEffect(() => {
    // Global mouse handlers for dragging cards across the stage.
    const handleMove = (e: MouseEvent) => {
      const current = dragState.current;
      if (!current.id) return;
      const deltaX = e.clientX - current.startX;
      const deltaY = e.clientY - current.startY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        isDraggingRef.current = true;
      }
      setDragOffsets((prev) => ({
        ...prev,
        [current.id as string]: {
          x: current.baseX + deltaX,
          y: current.baseY + deltaY,
        },
      }));
    };

    // Release drag and optionally cancel click when movement occurred.
    const handleUp = () => {
      if (isDraggingRef.current) {
        skipClickRef.current = true;
      }
      isDraggingRef.current = false;
      dragState.current.id = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const scatterProjects = useMemo(() => projects, [projects]);
  const {
    layouts: scatterLayouts,
    cardScale,
  } = useMemo(
    () => buildScatterLayout(projects.length, viewport.width, viewport.height),
    [projects.length, viewport.width, viewport.height]
  );
  const stackOffsets = useMemo(
    () => buildStackOffsets(projects.length),
    [projects.length]
  );

  return (
    <div
      className={`scatter-stage ${stageReady ? "is-ready" : ""} ${
        isUnpacked ? "is-open" : ""
      }`}
      style={
        isUnpacked
          ? ({
              ["--buffer-top" as string]: `${BUFFER_TOP}px`,
              ["--buffer-bottom" as string]: `${BUFFER_BOTTOM}px`,
            } as CSSProperties)
          : undefined
      }
    >
      <div
        className={`folder-stack ${isUnpacked ? "is-open" : ""}`}
        style={
          {
            ["--folder-scale" as string]: scatterScale * 1.25,
          } as CSSProperties
        }
      >
        <div className="folder-backdrop" />
        <div className="folder-tab" />
        <div className="folder-cover">
          <span className="folder-dot" />
        </div>
      </div>

      {scatterProjects.map((project, idx) => {
        const scatter = scatterLayouts[idx];
        const stackOffset = stackOffsets[idx];
        const dragOffset = dragOffsets[project.id] ?? { x: 0, y: 0 };
        const staggerDelay = `${idx * 70}ms`;
        const dealOffset = idx % 2 === 0 ? -16 : 16;
        // Position depends on whether cards are fanned out or stacked.
        const transform = isUnpacked
          ? `translate(calc(-50% + ${
              scatter.x * scatterScale + dragOffset.x
            }px), calc(var(--grid-top-offset, 0px) + ${
              scatter.y * scatterScale + dragOffset.y
            }px)) rotate(${scatter.rotate}deg) scale(${
              scatterScale * cardScale
            })`
          : `translate(calc(-50% + ${
              stackOffset * scatterScale
            }px), calc(-50% - ${idx * 3 * scatterScale}px)) rotate(${
              stackOffset * 0.6
            }deg) scale(${0.9 * scatterScale})`;

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => {
              if (skipClickRef.current || isDraggingRef.current) {
                skipClickRef.current = false;
                return;
              }
              onSelect(project);
            }}
            onMouseDown={(e) => {
              dragState.current = {
                id: project.id,
                startX: e.clientX,
                startY: e.clientY,
                baseX: dragOffsets[project.id]?.x ?? 0,
                baseY: dragOffsets[project.id]?.y ?? 0,
              };
              isDraggingRef.current = false;
            }}
            style={
              {
                ["--card-transform" as string]: transform,
                ["--stagger-delay" as string]: staggerDelay,
                ["--deal-offset" as string]: `${dealOffset}px`,
                zIndex: 50 + (projects.length - idx),
                ["--project-accent" as string]:
                  project.accent ?? fallbackAccent,
              } as CSSProperties
            }
            className={`scatter-card ${isUnpacked ? "is-open" : ""} ${
              selectedId === project.id ? "is-active" : ""
            }`}
            data-water-target
          >
            <div className="scatter-card-top">
              <span className="scatter-dot" />
              <span className="scatter-title">
                {project.bookmarkLabel ?? project.name}
              </span>
              <span className="scatter-period">{project.period}</span>
            </div>
            <p className="scatter-role">{project.role}</p>
            <div className="scatter-tags">
              {project.techStack.slice(0, 3).map((stack) => (
                <span key={stack} className="scatter-tag">
                  {stack}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
