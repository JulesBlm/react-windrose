import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arc, type SeriesPoint, stack } from "d3-shape";
import { useMemo } from "react";
import type { WindroseDataPoint } from "./types";
import { radians, TURN } from "./util";

type UseWindRose = {
  directions: string[];
  bins: Array<string> | ReadonlyArray<string>;
  data: Array<WindroseDataPoint<string, string>>;
  maxY: number;
  innerRadius: number;
  outerRadius: number;
  colorScheme: ReadonlyArray<string>;
  padAngle: number;
};

export function useWindRose({
  data,
  bins,
  innerRadius,
  outerRadius,
  directions,
  colorScheme,
  padAngle,
  maxY,
}: UseWindRose) {
  // the x scale is for the position of the bars along the circle, one full turn
  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(directions)
        .range([0, radians(TURN)])
        .align(0),
    [directions]
  );

  const yScale = useMemo(() => {
    return scaleLinear().domain([0, maxY]).range([innerRadius, outerRadius]);
  }, [innerRadius, outerRadius, maxY]);

  const colorScale = scaleOrdinal<string>()
    .domain(bins)
    .range(colorScheme);

  const arcGenerator = useMemo(
    () =>
      arc<SeriesPoint<WindroseDataPoint<string, string>>>()
        .startAngle((d) => xScale(d.data.direction)!)
        .endAngle((d) => xScale(d.data.direction)! + xScale.bandwidth())
        .innerRadius((d) => yScale(d[0]))
        .outerRadius((d) => yScale(d[1]))
        .padRadius(innerRadius)
        .padAngle(padAngle),
    [innerRadius, padAngle, xScale, yScale]
  );

  const stackedData = useMemo(
    () =>
      stack<WindroseDataPoint<string, string>, string>()
        .keys(bins)(data),
    [data, bins]
  );

  return {
    xScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    yLineStep: TURN / data.length,
    angleOffset: -(TURN / data.length) / 2,
  };
}
