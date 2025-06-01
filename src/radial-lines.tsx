import { range } from "d3-array";
import type { ScaleLinear } from "d3-scale";
import type { SVGProps } from "react";

/**
 * Props for the RadialLines component that renders radial grid lines
 * @ignore SVGProps<SVGGElement>
 */
export interface RadialLinesProps extends SVGProps<SVGGElement> {
  /** The angular step size in degrees between radial lines. This should be 360 divided by the number of directions */
  angleStep: number;
  /** The inner radius where the radial lines start */
  innerRadius: number;
  /** D3 scale for mapping values to radius */
  yScale: ScaleLinear<number, number>;
  /** Number of ticks to generate for the scale */
  tickCount: number;
}

/**
 * Renders a set of radial grid lines extending from the inner radius to the last tick
 * @param props - The component props
 * @returns A group of SVG line elements forming radial grid lines
 */
export function RadialLines({
  angleStep,
  innerRadius,
  yScale,
  tickCount,
  ...props
}: RadialLinesProps) {
  const x1 = innerRadius;
  const lastYTick = yScale.ticks(tickCount).at(-1);
  const x2 = yScale(lastYTick ?? 0); // to the last tick circle

  return (
    <g
      name="radial-lines"
      fill="none"
      stroke="gray"
      strokeWidth="1"
      strokeDasharray="1,4"
      {...props}
    >
      {/* -90 is the top (North) */}
      {range(-90, 270, angleStep).map((rotation) => (
        <line
          key={rotation}
          x1={x1}
          x2={x2}
          transform={`rotate(${rotation})`}
        />
      ))}
    </g>
  );
}
