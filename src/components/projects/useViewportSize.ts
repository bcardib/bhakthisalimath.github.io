import { useEffect, useState } from "react";

/** Viewport dimensions with padding for safe area; updates on resize. */
export function useViewportSize() {
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const update = () => {
      const paddingX = 48;
      const paddingY = 120;
      setSize({
        width: Math.max(280, window.innerWidth - paddingX),
        height: Math.max(400, window.innerHeight - paddingY),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
