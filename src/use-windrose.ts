import { max } from "d3-array";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arc, type SeriesPoint, stack } from "d3-shape";
import { useMemo } from "react";
import type { WindroseDataPoint } from "./types.js";
import { radians, TURN } from "./util.js";

type UseWindRose = {
  directions: string[];
  bins: Array<string> | ReadonlyArray<string>;
  data: Array<WindroseDataPoint<string, string>>;
  innerRadius: number;
  outerRadius: number;
  colorScheme: ReadonlyArray<string>;
  padAngle: number;
  maxY?: number;
};

export function useWindRose({
  data,
  bins,
  innerRadius,
  outerRadius,
  directions,
  colorScheme,
  padAngle,
  maxY = max(data, (d) => d.total) ?? 0,
}: UseWindRose) {
  // An angular x-scale
  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(directions)
        .range([0, radians(TURN)])
        .align(0),
    [directions],
  );

  // A radial y-scale maintains area proportionality of radial bars
  const yScale = useMemo(() => {
    return scaleLinear().domain([0, maxY]).range([innerRadius, outerRadius]);
  }, [innerRadius, outerRadius, maxY]);

  const colorScale = scaleOrdinal<string>().domain(bins).range(colorScheme);

  const arcGenerator = useMemo(
    () =>
      arc<SeriesPoint<WindroseDataPoint<string, string>>>()
        .startAngle((d) => xScale(d.data.direction)!)
        .endAngle((d) => xScale(d.data.direction)! + xScale.bandwidth())
        .innerRadius((d) => yScale(d[0]))
        .outerRadius((d) => yScale(d[1]))
        .padRadius(innerRadius)
        .padAngle(padAngle),
    [innerRadius, padAngle, xScale, yScale],
  );

  const stackedData = useMemo(
    () => stack<WindroseDataPoint<string, string>, string>().keys(bins)(data),
    [data, bins],
  );

  const angleStep = TURN / data.length;
  const angleOffset = -angleStep / 2;

  return {
    xScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  };
}
