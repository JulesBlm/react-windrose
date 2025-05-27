import type { Arc, Series, SeriesPoint } from "d3-shape";
import type { SVGProps } from "react";

export interface RingProps extends SVGProps<SVGGElement> {
  element: Series<{ direction: string }, string>;
  angleOffset: number;
  fill: string;
  arcGenerator: Arc<unknown, SeriesPoint<{ direction: string }>>;
}

export function Ring({
  element,
  angleOffset,
  fill,
  arcGenerator,
  ...props
}: RingProps) {
  return (
    <g name={`ring-bin-${element.key}`} fill={fill} {...props}>
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
              {point.data.direction}: {element.key}
            </title>
          </path>
        );
      })}
    </g>
  );
}
