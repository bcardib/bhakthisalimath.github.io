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

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

type TimelineViewProps = {
  projects: Project[];
  selectedId: string | null;
  onSelect: (project: Project) => void;
  fallbackAccent: string;
};

export function TimelineView({
  projects,
  selectedId,
  onSelect,
  fallbackAccent,
}: TimelineViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [viewportWidth, setViewportWidth] = useState(0);
  // Shared responsive scale so timeline cards match scatter breakpoints.
  const timelineScale = useProjectScale();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineScrollRaf = useRef<number | null>(null);
  const timelineInterruptedRef = useRef(false);
  const timelineScrollDuration = 16800;
  const revealBuffer = 140;

  const monthIndexFromPeriod = (period?: string, takeEnd = false) => {
    // Convert a period string like "Aug 2025 – Oct 2025" to a month index.
    if (!period) return null;
    const parts = period.split("–").map((p) => p.trim());
    const target = takeEnd && parts[1] ? parts[1] : parts[0];
    const [mon, yr] = target.split(/\s+/);
    const month = monthMap[mon as keyof typeof monthMap];
    const year = Number(yr);
    if (Number.isNaN(year) || month === undefined) return null;
    return year * 12 + month;
  };

  const formatMonthYear = (monthIndex: number | null) => {
    // Month index back to "Jan" label.
    if (monthIndex === null) return "";
    const year = Math.floor(monthIndex / 12);
    const month = monthIndex % 12;
    return monthNames[month];
  };

  // Projects sorted by end date (latest first) for consistent ordering.
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const endA = monthIndexFromPeriod(a.period, true) ?? 0;
      const endB = monthIndexFromPeriod(b.period, true) ?? 0;
      return endB - endA;
    });
  }, [projects]);

  // Compute timeline span and year ticks (anchored to include 2024–2025).
  const timelineMeta = useMemo(() => {
    const paddingMonths = 1;
    const endMonths = sortedProjects
      .map((p) => monthIndexFromPeriod(p.period, true))
      .filter((v): v is number => v !== null);
    const startMonths = sortedProjects
      .map((p) => monthIndexFromPeriod(p.period, false))
      .filter((v): v is number => v !== null);
    if (!endMonths.length || !startMonths.length) {
      const currentYear = new Date().getFullYear();
      return {
        minMonth: currentYear * 12,
        maxMonth: currentYear * 12,
        monthSpan: 12,
        minYear: currentYear,
        maxYear: currentYear,
        ticks: [currentYear],
      };
    }
    const forcedMin = 2024 * 12; // Jan 2024
    const forcedMax = 2025 * 12 + 11; // Dec 2025
    const minMonth = Math.max(
      0,
      Math.min(...startMonths, forcedMin) - paddingMonths
    );
    const maxMonth = Math.max(...endMonths, forcedMax) + paddingMonths;
    const monthSpan = Math.max(1, maxMonth - minMonth + 1);
    const minYear = Math.floor(minMonth / 12);
    const maxYear = Math.floor(maxMonth / 12);
    const tickStartYear = Math.max(minYear, Math.floor(forcedMin / 12));
    const tickEndYear = Math.max(maxYear, Math.floor(forcedMax / 12));
    const ticks = Array.from(
      { length: tickEndYear - tickStartYear + 1 },
      (_, i) => tickStartYear + i
    );
    return { minMonth, maxMonth, monthSpan, minYear, maxYear, ticks };
  }, [sortedProjects]);

  const timelineWidth = useMemo(
    () =>
      Math.max(
        900,
        timelineMeta.monthSpan * 90 * timelineScale,
        viewportWidth ? viewportWidth + 600 : 0
      ),
    [timelineMeta.monthSpan, timelineScale, viewportWidth]
  );

  const timelinePositions = useMemo(() => {
    // Use end date for card anchor; visibility uses this anchor plus a buffer.
    return sortedProjects.map((project) => {
      const endIdx = monthIndexFromPeriod(project.period, true);
      const pos =
        endIdx === null
          ? 0
          : ((endIdx - timelineMeta.minMonth) / timelineMeta.monthSpan) *
            timelineWidth;
      return { id: project.id, pos };
    });
  }, [
    sortedProjects,
    timelineMeta.minMonth,
    timelineMeta.monthSpan,
    timelineWidth,
  ]);

  // Mark cards visible if their anchor sits inside the viewport + buffer.
  const updateVisibility = (scrollLeft: number, width: number) => {
    // Flag cards as visible when their anchor overlaps the viewport.
    const start = scrollLeft - revealBuffer;
    const end = scrollLeft + width + revealBuffer;
    const next = new Set<string>();
    timelinePositions.forEach(({ id, pos }) => {
      if (pos >= start && pos <= end) {
        next.add(id);
      }
    });
    setVisibleIds((prev) => {
      if (prev.size === next.size && [...prev].every((id) => next.has(id))) {
        return prev;
      }
      return next;
    });
  };

  useEffect(() => {
    // Set initial scroll to the first (latest) project, then auto-scroll to its card.
    if (!timelineRef.current || !sortedProjects.length) return;

    // Reset any prior animation state.
    if (timelineScrollRaf.current) {
      cancelAnimationFrame(timelineScrollRaf.current);
      timelineScrollRaf.current = null;
    }
    timelineInterruptedRef.current = false;

    // Locate first project anchor.
    const firstProject = sortedProjects[0];
    const endIdx = monthIndexFromPeriod(firstProject.period, true);
    if (endIdx === null) return;
    const cardLeft =
      ((endIdx - timelineMeta.minMonth) / timelineMeta.monthSpan) *
      timelineWidth;

    // Compute scroll window.
    const start = 0;
    const target = Math.max(0, cardLeft - 24); // leave a small leading margin
    if (!Number.isFinite(start) || !Number.isFinite(target)) return;

    const container = timelineRef.current;

    // Jump to start, then ease to target.
    container.scrollTo({ left: start, behavior: "auto" });
    updateVisibility(container.scrollLeft, container.clientWidth);

    const startTime = performance.now();
    const animate = (now: number) => {
      if (timelineInterruptedRef.current) return;

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / timelineScrollDuration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = start + (target - start) * eased;

      container.scrollLeft = next;
      updateVisibility(next, container.clientWidth);

      if (progress < 1) {
        timelineScrollRaf.current = requestAnimationFrame(animate);
      }
    };

    timelineScrollRaf.current = requestAnimationFrame(animate);

    return () => {
      if (timelineScrollRaf.current) {
        cancelAnimationFrame(timelineScrollRaf.current);
        timelineScrollRaf.current = null;
      }
    };
  }, [sortedProjects, timelineMeta, timelineWidth, timelineScrollDuration]);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    // User interaction stops auto-scroll.
    const stopAnimation = () => {
      timelineInterruptedRef.current = true;
      if (timelineScrollRaf.current) {
        cancelAnimationFrame(timelineScrollRaf.current);
        timelineScrollRaf.current = null;
      }
    };

    const handleScroll = () => updateVisibility(el.scrollLeft, el.clientWidth);
    const handleResize = () => updateVisibility(el.scrollLeft, el.clientWidth);

    el.addEventListener("wheel", stopAnimation, { passive: true });
    el.addEventListener("pointerdown", stopAnimation);
    el.addEventListener("touchstart", stopAnimation, { passive: true });
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    updateVisibility(el.scrollLeft, el.clientWidth);

    return () => {
      el.removeEventListener("wheel", stopAnimation);
      el.removeEventListener("pointerdown", stopAnimation);
      el.removeEventListener("touchstart", stopAnimation);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [timelinePositions]);

  useEffect(() => {
    // Track container width to extend rail to full viewport + buffer.
    const updateWidth = () => {
      if (timelineRef.current) {
        setViewportWidth(timelineRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    window.addEventListener("resize", updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div
      className="timeline-graph is-entering"
      ref={timelineRef}
      style={
        {
          ["--timeline-sweep-duration" as string]: `${timelineScrollDuration}ms`,
          ["--timeline-scale" as string]: timelineScale,
        } as CSSProperties
      }
    >
      {(() => {
        const monthSpan = timelineMeta.monthSpan;
        const widthPx = timelineWidth;
        const axisY = 60;
        const lineY = axisY + 10;
        const cardsY = axisY + 80;
        return (
          <div
            className="timeline-rail"
            style={{
              width: `${widthPx}px`,
              height: `${cardsY + 220}px`,
              ["--timeline-scale" as string]: timelineScale,
            }}
          >
            <div className="timeline-axis" style={{ top: `${axisY}px` }}>
              {timelineMeta.ticks.map((year) => {
                const yearMonth = year * 12;
                const positionPercent =
                  ((yearMonth - timelineMeta.minMonth) / monthSpan) * 100;
                return (
                  <div
                    key={year}
                    className="timeline-tick"
                    style={{ left: `${positionPercent}%` }}
                  >
                    <span className="timeline-tick-line" />
                    <span className="timeline-tick-label">{year}</span>
                  </div>
                );
              })}
            </div>

            {sortedProjects.map((project, idx) => {
              const startIdx = monthIndexFromPeriod(project.period, false);
              const endIdx = monthIndexFromPeriod(project.period, true);
              if (startIdx === null || endIdx === null) return null;
              const startPx =
                ((startIdx - timelineMeta.minMonth) / monthSpan) * widthPx;
              const endPx =
                ((endIdx - timelineMeta.minMonth) / monthSpan) * widthPx;
              const segmentLeft = Math.max(0, Math.min(startPx, endPx));
              const segmentWidth = Math.max(80, Math.abs(endPx - startPx));
              const cardLeft = endPx;
              const showLine =
                hoveredId === project.id || selectedId === project.id;

              return (
                <div key={project.id} className="timeline-item">
                  {showLine && (
                    <div
                      className="timeline-segment"
                      style={
                        {
                          left: `${segmentLeft}px`,
                          width: `${segmentWidth}px`,
                          top: `${lineY}px`,
                          ["--project-accent" as string]:
                            project.accent ?? fallbackAccent,
                        } as CSSProperties
                      }
                    />
                  )}
                  {showLine && (
                    <>
                      <div
                        className="timeline-segment-label"
                        style={
                          {
                            left: `${segmentLeft}px`,
                            top: `${lineY - 10}px`,
                            ["--project-accent" as string]:
                              project.accent ?? fallbackAccent,
                          } as CSSProperties
                        }
                      >
                        {formatMonthYear(startIdx)}
                      </div>
                      <div
                        className="timeline-segment-label"
                        style={
                          {
                            left: `${segmentLeft + segmentWidth}px`,
                            top: `${lineY - 10}px`,
                            ["--project-accent" as string]:
                              project.accent ?? fallbackAccent,
                          } as CSSProperties
                        }
                      >
                        {formatMonthYear(endIdx)}
                      </div>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelect(project)}
                    className={`timeline-card ${
                      selectedId === project.id ? "is-active" : ""
                    } ${visibleIds.has(project.id) ? "is-visible" : ""}`}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={
                      {
                        left: `${cardLeft}px`,
                        top: `${cardsY}px`,
                        ["--project-accent" as string]:
                          project.accent ?? fallbackAccent,
                        ["--timeline-scale" as string]: timelineScale,
                      } as CSSProperties
                    }
                    data-water-target
                  >
                    <div className="timeline-meta">
                      <span className="timeline-dot" />
                      <span className="timeline-period">{project.period}</span>
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-title">
                        {project.bookmarkLabel ?? project.name}
                      </div>
                      <div className="timeline-role">{project.role}</div>
                      <div className="timeline-tags">
                        {project.techStack.slice(0, 4).map((stack) => (
                          <span key={stack} className="timeline-tag">
                            {stack}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="timeline-index">{idx + 1}</span>
                  </button>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
