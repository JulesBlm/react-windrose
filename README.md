# React Windrose

`react-windrose` is a React component library for creating wind rose diagrams. Wind rose charts display the distribution of wind speed and direction, commonly used in meteorology and environmental analysis.

`react-windrose` is built on top of D3.js for calculations and scales and uses React for rendering SVG elements. It provides a flexible way to create interactive wind rose diagrams.

![windrose chart made with react-windrose](https://raw.githubusercontent.com/JulesBlm/react-windrose/main/windrose.svg)

## Installation

```bash
npm install react-windrose
```

## Usage

Use the `<WindRose>` component for a good looking wind rose chart out-of-the-box.
It is meant to be a more-than-enough-for-most. If you need more control see [the customization](#customization) section for creating more custom wind rose diagrams by composing components.

### Basic Example

```jsx
import { WindRose } from "react-windrose";
```

Data is an array of objects. Each object should contain a `direction` (a cardinal direction like "North" or a degrees like `"180°"`) and values for bins

<details>
<summary>Type for data</summary>

```typescript
type WindroseDataPoint<
  TBinKeys extends string,
  TDirection extends string = string,
> = {
  direction: TDirection; // Wind direction (e.g., "N", "NE")
  total: number; // Calculated total of all bin values
  [key: TBinKeys]: number; // Bin values (e.g., "0-1": 3, "1-2": 5)
};
```

</details>

```js
const data = [
  { direction: "North", low: 2, medium: 3, high: 1 },
  { direction: "East", low: 6, medium: 1, high: 0 },
  { direction: "South", low: 5, medium: 1, high: 3 },
  { direction: "West", low: 1, medium: 1, high: 2 },
];
```

The `bins` array passed to `<WindRose>` should contain the keys of the bins in the objects in `data`.

```jsx
const bins = ["low", "medium", "high"];

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

**Note:** The `total` is automatically calculated by the component using the `sumRow` utility function and need not be provided in your input data to `<WindRose>`.

### With Legend

A component for adding a legend to the wind rose diagram.
`react-windrose` comes with a `Legend` (vertical by default) and `HorizontalLegend`.
Note that you have to add a title yourself as `children`.

```jsx
import { WindRose, VerticalLegend } from "react-windrose";

function WindRoseWithVerticalLegend() {
  return (
    <WindRose
      data={data}
      bins={bins}
      width={600}
      height={600}
      yUnits="m/s"
      colorScheme={colorScheme}
    >
      <VerticalLegend
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
      </VerticalLegend>
    </WindRose>
  );
}
```

## Building Custom Wind Roses

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
  bins, // Array of bin names (Array<string>
  innerRadius, // Inner radius of the wind rose (number)
  outerRadius, // Outer radius of the wind rose (number)
  directions, // Array of direction values (string[])
  colorScheme, // Color scheme for the bins (Array<string>)
  padAngle, // Padding angle between segments (number)
  maxY, // Optional maximum y value for scale (number, defaults to max total in data)
});
```

### Components

- `Ring`: Renders a single segment ring for a specific bin
- `RadialLines`: Renders the spokes of the wind rose
- `DirectionLabels`: Renders the direction labels around the wind rose
- `Tick`: Renders a value marker on the radial scale, consisting of a dashed circle (`TickCircle`) and its value label (`TickLabel`)
  - `TickCircle`: Renders the dashed circle at a specific radius
  - `TickLabel`: Renders the value label at the same radius as its circle

### Example: Custom Wind Rose

```jsx
import { useMemo } from "react";
import {
  Ring,
  RadialLines,
  DirectionLabels,
  Tick,
  useWindRose,
  sumRow,
} from "react-windrose";

function CustomWindRose({ data, bins, width, height, colorScheme }) {
  const outerRadius = Math.min(width, height) / 2.5;
  const innerRadius = 20;
  const dataDirections = data.map((d) => d.direction);

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
    dataDirections,
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
      <g name="rings">
        {stackedData.map((element) => (
          <Ring
            key={element.key}
            element={element}
            angleOffset={angleOffset}
            fill={colorScale(element.key)}
            arcGenerator={arcGenerator}
          />
        ))}
      </g>

      <DirectionLabels
        xScale={xScale}
        angleOffset={angleOffset}
        directions={dataDirections}
        outerRadius={outerRadius}
        fontSize={14}
        fontWeight={500}
      />

      <RadialLines
        angleStep={angleStep}
        innerRadius={innerRadius}
        yScale={yScale}
        tickCount={4}
        stroke="#888"
      />

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

      <text y={-outerRadius - 10} textAnchor="middle" fontWeight="bold">
        Custom Wind Rose
      </text>
    </svg>
  );
}
```

This approach allows you to create highly customized wind rose visualizations while still leveraging the core functionality of the library.

See the Storybook for more examples

## License

MIT © [Jules Blom](https://julesblom.com)

[Bedrock](https://bedrock.engineer)
