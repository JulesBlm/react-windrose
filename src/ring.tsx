import type { Arc, Series, SeriesPoint } from "d3-shape";
import type { ScaleOrdinal } from "d3-scale";
import type { SVGProps } from "react";

/**
 * Props for the Ring component that renders a single ring of a windrose chart
 */
export interface RingProps extends SVGProps<SVGGElement> {
  /** The data series for the ring */
  element: Series<{ direction: string }, string>;
  /** The angular offset of the ring */
  angleOffset: number;
  /** The color scale for the ring */
  colorScale: ScaleOrdinal<string, string>;
  /** The generator function for the ring */
  arcGenerator: Arc<unknown, SeriesPoint<{ direction: string }>>;
}

/**
 * Renders a single ring of a windrose chart
 * @param props - The component props
 * @returns An SVG group element containing the ring
 */
export function Ring({
  element,
  angleOffset,
  colorScale,
  arcGenerator,
  ...props
}: RingProps) {
  return (
    <g
      name={`ring-bin-${element.key}`}
      fill={colorScale(element.key)}
      {...props}
    >
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
