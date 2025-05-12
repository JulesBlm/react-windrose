import { range } from "d3-array";
import type { ScaleLinear } from "d3-scale";
import type { Arc, Series } from "d3-shape";
import React from "react";

export interface RingProps {
  d: Series<WindroseDataPoint, string>;
  angleOffset: number;
  fill: string;
  arcGenerator: Arc<any, any>; //TODO
  name: string;
}

export function Ring({ d, angleOffset, fill, arcGenerator, name }: RingProps) {
  return (
    <g name={`ring-bin-${name}`} fill={fill}>
      {d.map((e) => (
        <path
          // name={e.data.direction} // should use accessor
          key={angleOffset}
          d={arcGenerator(e)}
          transform={`rotate(${angleOffset})`}
        />
      ))}
    </g>
  );
}

export interface YTicksProps {
  yTicks: Array<number>;
  yScale: ScaleLinear<number, number>;
  outerRadius: number;
  yUnits: string;
  // format: (d: number) => string |;
}

export function YTicks({ yTicks, yScale, outerRadius, yUnits }: YTicksProps) {
  const tickFormat = yScale.tickFormat();
  return (
    <g name="y-ticks" textAnchor="middle" fontFamily="sans-serif" fontSize={18}>
      {yTicks.map((tick) => (
        <g name="y-circle-tick" key={tick}>
          <circle
            fill="none"
            stroke="gray" // make configurable
            strokeDasharray="4,4" // make configurable
            r={yScale(tick)}
          />
          <text
            y={-yScale(tick)}
            x={-8} // make configurable
            paintOrder="stroke"
            strokeWidth="1.4px" // make configurable
            stroke="white" // make configurable
          >
            {tickFormat(tick)}
          </text>
        </g>
      ))}

      <text
        y={-outerRadius}
        x={30}
        fontSize={18}
        paintOrder="stroke"
        strokeWidth="1.4px" // make configurable
        stroke="white" // make configurable
        name="yUnitsLabel"
      >
        {yUnits}
      </text>
    </g>
  );
}

export interface AxesProps {
  yLineStep: number;
  innerRadius: number;
  yScale: ScaleLinear<number, number>;
  yTicks: Array<number>;
}

export function Axes({ yLineStep, innerRadius, yScale, yTicks }: AxesProps) {
  return (
    <g name="axes" fill="none" stroke="gray" strokeDasharray="1,4">
      {range(-90, 270, yLineStep).map((d) => (
        <line
          key={d}
          x1={innerRadius}
          x2={yScale(yTicks.reverse()[0])} // to the last tick circle
          transform={`rotate(${d})`}
        />
      ))}
    </g>
  );
}
