import type { Arc, Series, SeriesPoint } from "d3-shape";
import type { SVGProps } from "react";
import type { WindroseDataPoint } from "./types.js";

export interface RingProps extends SVGProps<SVGGElement> {
  element: Series<WindroseDataPoint<string, string>, string>;
  angleOffset: number;
  fill: string;
  arcGenerator: Arc<unknown, SeriesPoint<WindroseDataPoint<string, string>>>;
  name: string;
}

export function Ring({
  element,
  angleOffset,
  fill,
  arcGenerator,
  name,
  ...props
}: RingProps) {
  return (
    <g name={`ring-bin-${name}`} fill={fill} {...props}>
      {element.map((point) => {
        const path = arcGenerator(point);
        if (!path) {
          return null;
        }

        return (
          <path
            name={`${element.key}_${point.data.direction}`}
            key={`${element.key}-${point.data.direction}`}
            d={path}
            transform={`rotate(${angleOffset})`}
          >
            <title>
              {point.data.direction}: {name}
            </title>
          </path>
        );
      })}
    </g>
  );
}
