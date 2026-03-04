"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

type FluidCursorProps = {
  fluidColor?: string;
  backgroundColor?: string;
  showBackground?: boolean;
  blend?: number;
  intensity?: number;
  force?: number;
  distortion?: number;
  radius?: number;
  curl?: number;
  swirl?: number;
  velocityDissipation?: number;
  densityDissipation?: number;
  pressure?: number;
  rainbow?: boolean;
};

/** Theme-based colors and strength. Light: medium–dark grey/blue; both: tuned to be noticeable with gentle movement. */
const FLUID_THEME = {
  dark: {
    fluidColor: "#04121a",
    backgroundColor: "#58a6ff",
    intensity: 5.5,
    force: 4,
    radius: 0.08,
  },
  light: {
    fluidColor: "#475569",   // slate-600 – medium grey/blue base
    backgroundColor: "#1e293b", // slate-800 – dark grey/blue trail, visible on light bg
    intensity: 5.5,
    force: 4,
    radius: 0.08,
  },
} as const;

/**
 * Full-screen fluid cursor overlay.
 * Pointer events are disabled so the rest of the UI stays interactive.
 */
export default function FluidCursor({
  fluidColor: propFluidColor,
  backgroundColor: propBackgroundColor,
  showBackground = false,
  blend = 0,
  intensity: propIntensity,
  force: propForce,
  distortion = 1.05,
  radius: propRadius,
  curl = 9,
  swirl = 6,
  velocityDissipation = 0.99,
  densityDissipation = 0.98,
  pressure = 0.9,
  rainbow = false,
}: FluidCursorProps) {
  const { theme } = useTheme();
  const themeColors = FLUID_THEME[theme];

  const fluidColor = propFluidColor ?? themeColors.fluidColor;
  const backgroundColor = propBackgroundColor ?? themeColors.backgroundColor;
  const intensity = propIntensity ?? themeColors.intensity;
  const force = propForce ?? themeColors.force;
  const radius = propRadius ?? themeColors.radius;

  const eventSource =
    typeof window !== "undefined" ? (document.body as HTMLElement) : undefined;

  const style = useMemo(
    () => ({
      position: "fixed" as const,
      inset: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none" as const,
      zIndex: 40,
    }),
    []
  );

  return (
    <Canvas
      style={style}
      gl={{ antialias: true, alpha: true }}
      eventSource={eventSource}
      eventPrefix="client"
    >
      <EffectComposer>
        <Fluid
          fluidColor={fluidColor}
          backgroundColor={backgroundColor}
          showBackground={showBackground}
          blend={blend}
          intensity={intensity}
          force={force}
          distortion={distortion}
          radius={radius}
          curl={curl}
          swirl={swirl}
          velocityDissipation={velocityDissipation}
          densityDissipation={densityDissipation}
          pressure={pressure}
          rainbow={rainbow}
        />
      </EffectComposer>
    </Canvas>
  );
}
