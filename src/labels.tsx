import { type ScaleBand } from "d3-scale";
import { type SVGProps } from "react";
import { fluidFontSize, TURN } from "./util.js";

/**
 * Props for the DirectionLabels component that renders labels around a circular chart
 * @ignore SVGProps<SVGGElement>
 */
export interface DirectionLabelsProps extends SVGProps<SVGGElement> {
  /** The radius of the outer circle where labels will be positioned */
  outerRadius: number;
  /** D3 scale for mapping directions to angles */
  xScale: ScaleBand<string>;
  /** Array of direction names to display as labels */
  directions: Array<string> | ReadonlyArray<string>;
}

/**
 * Renders a group of direction labels around a circular chart
 * @param props - The component props
 * @returns A group of SVG text elements positioned around a circle
 */
export function DirectionLabels({
  outerRadius,
  xScale,
  directions,
  fontSize = fluidFontSize(0.1)(outerRadius),
  ...props
}: DirectionLabelsProps) {
  const angleOffset = -TURN / directions.length / 2;

  return (
    <g
      name="direction-labels"
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="middle"
      paintOrder="stroke"
      strokeWidth="1px"
      stroke="white"
      fill="black"
      fontSize={fontSize}
      {...props}
    >
      {directions.map((direction) => (
        <Label
          key={direction}
          direction={direction}
          angleOffset={angleOffset}
          xScale={xScale}
          outerRadius={outerRadius}
        />
      ))}
    </g>
  );
}

/**
 * Props for the Label component that renders a single direction label
 */
export interface LabelProps {
  /** The direction text to display */
  direction: string;
  /** Angular offset to adjust label positioning */
  angleOffset: number;
  /** D3 scale for mapping directions to angles */
  xScale: ScaleBand<string>;
  /** The radius of the outer circle where the label will be positioned */
  outerRadius: number;
  /** Optional offset from the outer radius (defaults to 10% of outerRadius) */
  offset?: number;
}

/**
 * Renders a single direction label positioned around a the wind rose
 * @param props - The component props
 * @returns An SVG text element positioned at the correct angle and distance
 */
export function Label({
  direction,
  angleOffset,
  xScale,
  outerRadius,
  offset = 0.1 * outerRadius,
}: LabelProps) {
  const baseRotation = xScale(direction)! + xScale.bandwidth() / 2;
  const isInLeftHalf = (baseRotation + Math.PI / 2) % (2 * Math.PI) < Math.PI;
  const rotationLabel = isInLeftHalf ? 90 : -90;
  const rotation = (baseRotation * 180) / Math.PI - (90 - angleOffset);

  return (
    <text
      name="label"
      paintOrder="stroke"
      strokeWidth="1px"
      stroke="white"
      transform={`rotate(${rotation}) translate(${outerRadius + offset},0) rotate(${rotationLabel})`}
    >
      {direction}
    </text>
  );
}
