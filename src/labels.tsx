import { type ScaleBand } from "d3-scale";
import { type SVGProps } from "react";

export interface DirectionLabelsProps extends SVGProps<SVGGElement> {
  angleOffset: number;
  outerRadius: number;
  xScale: ScaleBand<string>;
  directions: Array<string>;
  fontWeight?: number;
  fontSize?: number;
  textAnchor?: "start" | "middle" | "end";
}

export function DirectionLabels({
  angleOffset,
  outerRadius,
  xScale,
  directions,
  fontWeight = 600,
  fontSize = 16,
  ...props
}: DirectionLabelsProps) {
  return (
    <g
      name="direction-labels"
      fontWeight={fontWeight}
      fontSize={fontSize}
      textAnchor="middle"
      dominantBaseline="middle"
      {...props}
    >
      {directions.map((direction, i) => (
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

  const transformLabelText = isInLeftHalf(direction)
    ? "rotate(90)" // why the 6?
    : "rotate(-90)";

  const rotation =
    ((Number(xScale(direction)) + xScale.bandwidth() / 2) * 180) / Math.PI -
    (90 - angleOffset);

  return (
    <g
      name="label"
      transform={`rotate(${rotation}) translate(${outerRadius + offset},0)`}
    >
      <text transform={transformLabelText}>{direction}</text>
    </g>
  );
}
