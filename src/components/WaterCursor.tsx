"use client";
import { useEffect, useRef } from "react";

type TargetRect = { left: number; top: number; right: number; bottom: number };

export default function WaterCursor() {
  const blobRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  const targetRects = useRef<TargetRect[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const updateTargets = () => {
      // 给你卡片加 data-water-target 就会被“接触”
      const els = Array.from(
        document.querySelectorAll("[data-water-target]")
      ) as HTMLElement[];
      targetRects.current = els.map((el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
      });
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onScrollOrResize = () => updateTargets();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    updateTargets();

    // 简单的弹簧跟随（更像液体/黏性）
    const stiffness = 0.18; // 越大越跟手
    const damping = 0.72; // 越小越“Q弹”
    const baseSize = 18;

    const animate = () => {
      const m = mouse.current;
      const p = pos.current;
      const v = vel.current;

      // 默认目标就是鼠标
      let tx = m.x;
      let ty = m.y;

      // --- 磁吸 / 接触计算 ---
      // 找最近的 target，如果在影响范围内就吸过去一些
      const influence = 140; // 影响半径
      let closestDist = Infinity;
      let closest: {
        cx: number;
        cy: number;
        nx: number;
        ny: number;
        inside: boolean;
      } | null = null;

      for (const r of targetRects.current) {
        // clamp 到矩形边缘/内部最近点
        const cx = Math.min(Math.max(m.x, r.left), r.right);
        const cy = Math.min(Math.max(m.y, r.top), r.bottom);

        const dx = m.x - cx;
        const dy = m.y - cy;
        const dist = Math.hypot(dx, dy);

        // inside：鼠标在矩形内部
        const inside =
          m.x >= r.left && m.x <= r.right && m.y >= r.top && m.y <= r.bottom;

        if (dist < closestDist) {
          closestDist = dist;
          const inv = dist === 0 ? 0 : 1 / dist;
          const nx = dist === 0 ? 0 : dx * inv;
          const ny = dist === 0 ? 0 : dy * inv;
          closest = { cx, cy, nx, ny, inside };
        }
      }

      let squash = 0; // 0~1
      let angle = 0;

      if (closest && closestDist < influence) {
        // 吸附强度：越近越强
        const t = 1 - closestDist / influence; // 0~1
        const pull = 0.22 * t; // 吸到卡片附近一点点即可

        tx = m.x + (closest.cx - m.x) * pull;
        ty = m.y + (closest.cy - m.y) * pull;

        // 接触/靠近时挤压：越近越扁
        squash = Math.min(1, t * (closest.inside ? 1 : 0.9));
        // 挤压方向：沿法线方向拉伸/压扁
        angle = Math.atan2(closest.ny, closest.nx);
      }

      // --- 弹簧跟随 ---
      const ax = (tx - p.x) * stiffness;
      const ay = (ty - p.y) * stiffness;
      v.x = (v.x + ax) * damping;
      v.y = (v.y + ay) * damping;
      p.x += v.x;
      p.y += v.y;

      // --- 水珠变形：squash & stretch ---
      // 速度越快，越“拉长”
      const speed = Math.min(20, Math.hypot(v.x, v.y));
      const stretch = speed / 20; // 0~1

      // 结合接触挤压 + 速度拉伸
      const sx = 1 + stretch * 0.35 - squash * 0.25;
      const sy = 1 - stretch * 0.15 - squash * 0.35;

      blob.style.transform =
        `translate3d(${p.x}px, ${p.y}px, 0) ` +
        `translate3d(-50%, -50%, 0) ` +
        `rotate(${angle}rad) scale(${sx}, ${sy})`;

      // 可选：接触时更亮一点
      blob.style.opacity = closest && closestDist < influence ? "0.95" : "0.8";

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // 目标变化（比如你的 timeline cards 动态出现）
    const mo = new MutationObserver(() => updateTargets());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, []);

  return <div ref={blobRef} className="water-cursor" aria-hidden="true" />;
}
