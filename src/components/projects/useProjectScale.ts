import { useEffect, useState } from "react";

/**
 * Shared responsive scale hook for project cards (scatter + timeline).
 * Returns 1 until after mount to avoid SSR/client hydration mismatch,
 * then computes from window size.
 */
export function useProjectScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const computeScale = () => {
      const w = window.innerWidth;
      if (w < 480) return 0.6;
      if (w < 640) return 0.7;
      if (w < 820) return 0.8;
      if (w < 1024) return 0.9;
      return 1;
    };
    setScale(computeScale());
    const handler = () => setScale(computeScale());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return scale;
}
