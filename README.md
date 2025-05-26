# React Windrose

A customizable React component library for creating wind rose diagrams. Wind rose charts display the distribution of wind speed and direction, commonly used in meteorology and environmental analysis.

Built on top of D3.js for calculations and scales while using React for rendering SVG elements, this library provides a flexible way to create interactive wind rose diagrams.

<!-- TODO example windrose -->

## Installation

```bash
npm install react-windrose
```

## Usage

### Basic Example

```jsx
import { WindRose } from "react-windrose";

const cardinalDirections = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
]

// Define your data
const data = [
  { direction: "N", "0-1": 2, "1-2": 3, "2-3": 1, "3-4": 0, "4-5": 0 },
  { direction: "NE", "0-1": 1, "1-2": 2, "2-3": 3, "3-4": 1, "4-5": 0 },
  // ... more directions
];

// Define your bins (speed ranges)
const bins = ["0-1", "1-2", "2-3", "3-4", "4-5"];

const colorScheme = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6"];

function MyWindRose() {
  return (
    <WindRose
      data={data}
      bins={bins}
      width={600}
      height={600}
      yUnits="m/s"
      colorScheme={colorScheme}
    />
  );
}
```

### With Legend

```jsx
import { WindRose } from "react-windrose";
import { Legend } from "react-windrose/legend";

const colorScheme = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6"];

function MyWindRoseWithLegend() {
  return (
    <WindRose
      data={data}
      bins={bins}
      width={600}
      height={600}
      yUnits="m/s"
      colorScheme={colorScheme}
    >
      <Legend
        bins={bins}
        colorScheme={colorScheme}
        transform="translate(250,100)"
      >
        <text
          textDecoration="underline"
          textAnchor="middle"
          transform="translate(0,-20)"
        >
          Wind Speed (m/s)
        </text>
      </Legend>
    </WindRose>
  );
}
```

## API Reference

### `<WindRose>` Component

The main component for rendering wind rose diagrams. This component is meant to be a more-than-enough-for-most. If you need more control see [the customization](#customization) section for creating more custom wind rose diagrams.

#### Props

| Prop          | Type                          | Required | Default         | Description                                                                                                                          |
| ------------- | ----------------------------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `width`       | number                        | Yes      | -               | Width of the chart in pixels                                                                                                         |
| `height`      | number                        | Yes      | -               | Height of the chart in pixels                                                                                                        |
| `data`        | Array<WindroseDataPoint>      | Yes      | -               | Array of data points with direction and values for each bin                                                                          |
| `bins`        | Array<string>                 | Yes      | -               | Array of bin names (speed ranges)                                                                                                    |
| `yUnits`      | string                        | Yes      | -               | Units for the y-axis (e.g., "m/s")                                                                                                   |
| `colorScheme` | ReadonlyArray<string>         | No       | blueColorScheme | Array of colors for the bins (defaults to blue color scheme)                                                                         |
| `innerRadius` | number                        | No       | 20              | Inner radius of the wind rose                                                                                                        |
| `tickCount`   | number                        | No       | 4               | Number of ticks on the y-axis. The specified count is only a hint; the scale may return more or fewer values depending on the domain |
| `padAngle`    | number                        | No       | 0.05            | Padding angle between segments                                                                                                       |
| `maxY`        | number                        | No       | Auto            | Maximum value for the y-axis scale (defaults to the maximum data total)                                                              |
| `children`    | ReactNode                     | No       | -               | Additional components (e.g., Legend)                                                                                                 |
| `...props`    | React.SVGProps<SVGSVGElement> | No       | -               | All other SVG props are passed through to the root SVG element                                                                       |

### `<Legend>` Component

A component for adding a legend to the wind rose diagram.

#### Props

| Prop          | Type                                   | Required | Default       | Description                              |
| ------------- | -------------------------------------- | -------- | ------------- | ---------------------------------------- |
| `bins`        | Array<string>                          | Yes      | -             | Array of bin names                       |
| `colorScheme` | Array<string> \| ReadonlyArray<string> | Yes      | -             | Array of colors for the bins             |
| `x`           | number                                 | No       | 0             | X-coordinate position of the legend      |
| `y`           | number                                 | No       | 0             | Y-coordinate position of the legend      |
| `rectWidth`   | number                                 | No       | 18            | Width of the legend rectangles           |
| `rectHeight`  | number                                 | No       | rectWidth     | Height of the legend rectangles          |
| `spacingY`    | number                                 | No       | rectWidth + 2 | Vertical spacing between legend items    |
| `textX`       | number                                 | No       | rectWidth + 4 | X position of text relative to rectangle |
| `textY`       | number                                 | No       | rectWidth / 2 | Y position of text relative to rectangle |
| `rectProps`   | React.SVGProps<SVGRectElement>         | No       | -             | Additional props for rectangle elements  |
| `textProps`   | React.SVGProps<SVGTextElement>         | No       | -             | Additional props for text elements       |
| `children`    | ReactNode                              | No       | -             | Custom content (typically legend title)  |

### Data Format

The `data` prop should be an array of objects with the following structure:

```typescript
type WindroseDataPoint<
  TBinKeys extends string,
  TDirection extends string = string,
> = {
  direction: TDirection; // Wind direction (e.g., "N", "NE")
  total: number; // Auto-calculated total of all bin values
  [key: TBinKeys]: number; // Bin values (e.g., "0-1": 3, "1-2": 5)
};
```

**Note:** The `total` field is automatically calculated by the component using the `sumRow` utility function and should not be provided in your input data.

## Customization

The `WindRose` component can be customized in various ways:

- Change colors with the `colorScheme` prop
- Adjust the size with `width` and `height` props
- Modify the inner radius with `innerRadius`
- Change the number of y-axis ticks with `tickCount`
- Adjust padding between segments with `padAngle`

## Advanced: Building Custom Wind Roses

You can create custom wind rose diagrams by using the `useWindRose` hook and composing the individual components. This gives you complete control over the appearance of your wind rose.

### `useWindRose`

The `useWindRose` hook provides all the necessary scales and generators for creating wind rose diagrams:

```typescript
const {
  xScale, // D3 scale for the angular direction
  yScale, // D3 scale for the radial values
  colorScale, // D3 scale for the colors
  arcGenerator, // D3 arc generator
  stackedData, // Stacked data for rendering
  angleStep, // Step size for radial lines (360 / data.length)
  angleOffset, // Angle offset for proper orientation (-angleStep / 2)
} = useWindRose({
  data, // Your data with row totals (WindroseDataPoint[])
  bins, // Array of bin names (Array<string> | ReadonlyArray<string>)
  innerRadius, // Inner radius of the wind rose (number)
  outerRadius, // Outer radius of the wind rose (number)
  directions, // Array of direction values (string[])
  colorScheme, // Color scheme for the bins (ReadonlyArray<string>)
  padAngle, // Padding angle between segments (number)
  maxY, // Optional maximum y value for scale (number, defaults to max total in data)
});
```

### Components

- `Ring`: Renders a single segment ring for a specific bin
- `RadialLines`: Renders the spokes of the wind rose
- `DirectionLabels`: Renders the direction labels around the wind rose
- `Tick`: Renders a single tick mark on the y-axis

### Example: Custom Wind Rose

```jsx
import { useMemo } from "react";
import {
  Ring,
  RadialLines,
  DirectionLabels,
  Tick,
  useWindRose,
} from "react-windrose";
import { sumRow } from "react-windrose/util";

function CustomWindRose({ data, bins, width, height, colorScheme }) {
  const outerRadius = Math.min(width, height) / 2.5;
  const innerRadius = 20;
  const directions = data.map((d) => d.direction);

  // Calculate row totals
  const dataWithRowTotals = useMemo(
    () => data.map((r) => ({ ...r, total: sumRow(r) })),
    [data],
  );

  // Use the hook to get scales and generators
  const {
    xScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  } = useWindRose({
    data: dataWithRowTotals,
    innerRadius,
    outerRadius,
    colorScheme,
    directions,
    bins,
    padAngle: 0.05,
  });

  const yTicks = yScale.ticks(4);

  return (
    <svg
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      width={width}
      height={height}
    >
      {/* Render the data rings */}
      <g name="rings">
        {stackedData.map((element) => (
          <Ring
            key={element.key}
            element={element}
            name={element.key}
            angleOffset={angleOffset}
            fill={colorScale(element.key)}
            arcGenerator={arcGenerator}
          />
        ))}
      </g>

      <DirectionLabels
        xScale={xScale}
        angleOffset={angleOffset}
        directions={directions}
        outerRadius={outerRadius}
        fontSize={14}
        fontWeight={500}
      />

      <RadialLines
        angleStep={angleStep}
        innerRadius={innerRadius}
        yScale={yScale}
        yTicks={yTicks}
        stroke="#888"
      />

      {/* Render tick marks */}
      <g name="ticks" textAnchor="middle" fontSize={14}>
        {yTicks.map((tick) => (
          <Tick
            key={tick}
            tick={tick}
            yScale={yScale}
            circleProps={{ stroke: "#888" }}
            textProps={{ fill: "#333" }}
          />
        ))}
      </g>

      {/* Custom elements */}
      <text y={-outerRadius - 10} textAnchor="middle" fontWeight="bold">
        Custom Wind Rose
      </text>
    </svg>
  );
}
```

This approach allows you to create highly customized wind rose visualizations while still leveraging the core functionality of the library.

<!-- TODO add custom examples -->

## License

MIT © [Jules Blom](https://julesblom.com)

[Bedrock](https://bedrock.engineer)
