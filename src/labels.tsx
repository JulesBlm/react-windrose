import { type ScaleBand } from "d3-scale";
import { type SVGProps } from "react";

export interface DirectionLabelsProps extends SVGProps<SVGGElement> {
  angleOffset: number;
  outerRadius: number;
  xScale: ScaleBand<string>;
  directions: Array<string>;
}

export function DirectionLabels({
  angleOffset,
  outerRadius,
  xScale,
  directions,
  ...props
}: DirectionLabelsProps) {
  return (
    <g
      name="direction-labels"
      fontWeight="600"
      fontSize="16"
      textAnchor="middle"
      dominantBaseline="middle"
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

export interface LabelProps {
  direction: string;
  angleOffset: number;
  xScale: ScaleBand<string>;
  outerRadius: number;
  offset?: number;
}

export function Label({
  direction,
  angleOffset,
  xScale,
  outerRadius,
  offset = 20,
}: LabelProps) {
  const isInLeftHalf = (direction: string) =>
    (xScale(direction)! + xScale.bandwidth() / 2 + Math.PI / 2) %
      (2 * Math.PI) <
    Math.PI;

  const rotationLabel = isInLeftHalf(direction) ? 90 : -90;

  const rotation =
    ((Number(xScale(direction)) + xScale.bandwidth() / 2) * 180) / Math.PI -
    (90 - angleOffset);

  return (
    <g
      name="label"
      transform={`rotate(${rotation}) translate(${outerRadius + offset},0)`}
    >
      <text transform={`rotate(${rotationLabel})`}>{direction}</text>
    </g>
  );
}
