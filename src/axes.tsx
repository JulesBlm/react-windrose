import { range } from "d3-array";
import type { ScaleLinear } from "d3-scale";
import type { SVGProps } from "react";

export interface TickProps extends SVGProps<SVGGElement> {
  tick: number;
  yScale: ScaleLinear<number, number>;
  circleProps?: SVGProps<SVGCircleElement>;
  textProps?: SVGProps<SVGTextElement>;
}

export function Tick({ tick, yScale, circleProps, textProps }: TickProps) {
  const tickFormat = yScale.tickFormat();

  return (
    <g name="y-circle-tick" key={tick}>
      <circle
        fill="none"
        stroke="gray"
        strokeDasharray="4,4"
        {...circleProps}
        r={yScale(tick)}
      />

      <text
        x={-8}
        paintOrder="stroke"
        strokeWidth="1.4px"
        stroke="white"
        {...textProps}
        y={-yScale(tick)}
      >
        {tickFormat(tick)}
      </text>
    </g>
  );
}
export interface AxesProps extends SVGProps<SVGGElement> {
  yLineStep: number;
  innerRadius: number;
  yScale: ScaleLinear<number, number>;
  yTicks: Array<number>;
}

export function Axes({
  yLineStep,
  innerRadius,
  yScale,
  yTicks,
  ...props
}: AxesProps) {
  const x1 = innerRadius;
  const x2 = yScale(yTicks.toReversed()[0]); // to the last tick circle

  return (
    <g name="axes" fill="none" stroke="gray" strokeDasharray="1,4" {...props}>
      {range(-90, 270, yLineStep).map((rotation) => (
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
