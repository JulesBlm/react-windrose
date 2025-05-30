import type { ScaleLinear } from "d3-scale";
import type { SVGProps } from "react";

/**
 * Props for the TickCircle component that renders a circular tick mark
 * @ignore SVGProps<SVGCircleElement>
 */
export interface TickCircleProps extends SVGProps<SVGCircleElement> {
  /** The value at which to place the tick circle */
  tick: number;
  /** D3 scale for mapping values to radius */
  yScale: ScaleLinear<number, number>;
}

/**
 * Renders a single circular tick mark at a specified radius
 * @param props - The component props
 * @returns An SVG circle element representing a tick mark
 */
export function TickCircle({ tick, yScale, ...props }: TickCircleProps) {
  return (
    <circle
      fill="none"
      stroke="gray"
      strokeWidth="1"
      strokeDasharray="4"
      {...props}
      r={yScale(tick)}
    />
  );
}

/**
 * Props for the TickLabel component that renders a tick value label
 * @ignore SVGProps<SVGTextElement>
 */
export interface TickLabelProps extends SVGProps<SVGTextElement> {
  /** The value to display as a label */
  tick: number;
  /** D3 scale for mapping values to radius */
  yScale: ScaleLinear<number, number>;
}

/**
 * Renders a single tick value label at a specified radius
 * @param props - The component props
 * @returns An SVG text element displaying the formatted tick value
 */
export function TickLabel({ tick, yScale, ...props }: TickLabelProps) {
  const tickFormat = yScale.tickFormat();

  return (
    <text
      x={0}
      dy="0.35em"
      paintOrder="stroke"
      strokeWidth="2"
      stroke="white"
      fill="black"
      {...props}
      y={-yScale(tick)}
    >
      {tickFormat(tick)}
    </text>
  );
}

/**
 * Props for the Tick component that combines a circle and label
 * @ignore SVGProps<SVGGElement>
 */
export interface TickProps extends SVGProps<SVGGElement> {
  /** The value at which to place the tick */
  tick: number;
  /** D3 scale for mapping values to radius */
  yScale: ScaleLinear<number, number>;
  /** Optional props to pass to the TickCircle component */
  circleProps?: SVGProps<SVGCircleElement>;
  /** Optional props to pass to the TickLabel component */
  textProps?: SVGProps<SVGTextElement>;
}

/**
 * Renders a complete tick mark with both circle and label
 * @param props - The component props
 * @returns A group containing a circle and text element for the tick
 */
export function Tick({ tick, yScale, circleProps, textProps }: TickProps) {
  return (
    <g name="tick">
      <TickCircle tick={tick} yScale={yScale} {...circleProps} />
      <TickLabel tick={tick} yScale={yScale} {...textProps} />
    </g>
  );
}
