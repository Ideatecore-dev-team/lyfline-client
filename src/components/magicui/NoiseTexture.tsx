import * as React from "react";
import { cn } from "@/lib/utils";

interface NoiseTextureProps extends React.SVGProps<SVGSVGElement> {
  noiseOpacity?: number;
  frequency?: number;
  octaves?: number;
  slope?: number;
}

export function NoiseTexture({
  noiseOpacity = 0.05, // Subtle default opacity
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  className,
  ...props
}: NoiseTextureProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full opacity-100 z-0",
        className
      )}
      {...props}
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
        />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity={noiseOpacity} />
    </svg>
  );
}

export default NoiseTexture;
