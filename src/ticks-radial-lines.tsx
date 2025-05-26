import { range } from "d3-array";
import type { ScaleLinear } from "d3-scale";
import type { SVGProps } from "react";

export interface TickCircleProps extends SVGProps<SVGCircleElement> {
  tick: number;
  yScale: ScaleLinear<number, number>;
}

export function TickCircle({ tick, yScale, ...props }: TickCircleProps) {
  return (
    <circle
      fill="none"
      stroke="gray"
      strokeDasharray="4"
      {...props}
      r={yScale(tick)}
    />
  );
}

export interface TickLabelProps extends SVGProps<SVGTextElement> {
  tick: number;
  yScale: ScaleLinear<number, number>;
}

export function TickLabel({ tick, yScale, ...props }: TickLabelProps) {
  const tickFormat = yScale.tickFormat();

  return (
    <text
      x={0}
      dy="0.35em"
      paintOrder="stroke"
      strokeWidth="1.4px"
      stroke="white"
      {...props}
      y={-yScale(tick)}
    >
      {tickFormat(tick)}
    </text>
  );
}

export interface TickProps extends SVGProps<SVGGElement> {
  tick: number;
  yScale: ScaleLinear<number, number>;
  circleProps?: SVGProps<SVGCircleElement>;
  textProps?: SVGProps<SVGTextElement>;
}

export function Tick({ tick, yScale, circleProps, textProps }: TickProps) {
  return (
    <g name="tick">
      <TickCircle tick={tick} yScale={yScale} {...circleProps} />
      <TickLabel tick={tick} yScale={yScale} {...textProps} />
    </g>
  );
}

export interface RadialLinesProps extends SVGProps<SVGGElement> {
  /** The angular step size in degrees between radial lines. This should be360 divided by the number of directions */
  angleStep: number;
  innerRadius: number;
  yScale: ScaleLinear<number, number>;
  tickCount: number;
}

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
      strokeDasharray="1,4"
      {...props}
    >
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
