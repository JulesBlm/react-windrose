import { useControls } from "leva";
import { Legend } from "./legend";
import WindRose from "./react-windrose";
import { cardinalDirections, blueColorScheme } from "./util";

export const defaultBins = ["0-1", "1-2", "2-3", "3-4", "4-5"] as const;

export const testData = makeTableData({
  bins: defaultBins,
  directions: cardinalDirections,
});

/** Generate new table data from given bins and directions */
export function makeTableData<
  Bins extends ReadonlyArray<string> = ReadonlyArray<string>,
  Directions extends ReadonlyArray<string> = ReadonlyArray<string>
>({ directions, bins }: { directions: Directions; bins: Bins }) {
  if (!directions || !directions.length) {
    throw new Error("Directions array can't be empty or undefined");
  }

  if (!bins || !bins.length) {
    throw new Error("Directions array can't be empty or undefined");
  }

  const constructedData = directions.map((direction) => {
    const row = { direction };

    for (const bin of bins) {
      const rowValue = Math.floor(Math.random() * Math.floor(5));

      row[bin] = rowValue;
    }

    return row;
  });

  return constructedData;
}

export default function App() {
  return (
    <main>
      <section>
        <h2>default</h2>
        <DefaultWindRose />
      </section>

      <section>
        <h2>Four Direction Wind Rose</h2>
        <FourDirectionWindRose />
      </section>

      <section>
        <h2>Eight Direction Wind Rose</h2>
        <EightDirectionWindRose />
      </section>
    </main>
  );
}

function DefaultWindRose() {
  const { maxY, padAngle, innerRadius, colorScheme, tickCount } = useControls({
    maxY: 20,
    padAngle: {
      value: 0.05,
      min: 0,
      max: 0.3,
    },
    innerRadius: {
      value: 20,
      min: 0,
      max: 100,
    },
    colorScheme: {
      value: "Default",
      options: [[
        "Default",
        blueColorScheme,
      ], [
        "Viridis",
        viridisColorScheme,
      ], [
        "Greys",
        greys,
      ]],
    },
    tickCount: {
      value: 5,
      step: 1,
      min: 1,
      max: 20,
    },
  });

  return (
    <WindRose
      data={testData}
      bins={defaultBins}
      width={600}
      height={600}
      yUnits={"(m/s)"}
      colorScheme={blueColorScheme}
      // maxY={maxY}
      innerRadius={innerRadius}
      padAngle={padAngle}
      tickCount={tickCount}
    >
      <Legend
        bins={defaultBins}
        rectWidth={42}
        textX={42 / 2}
        textProps={{
          textAnchor: "middle",
          fontSize: 16,
        }}
        colorScheme={blueColorScheme}
        transform={`translate(200,-275)`}
      >
        <text
          textDecoration="underline"
          textAnchor="end"
          transform={`translate(40,-10)`}
        >
          Wind velocity (m/s)
        </text>
      </Legend>
    </WindRose>
  );
}

const viridisColorScheme =  [
  "#440154",
  "#414487",
  "#2a788e",
  "#22a884",
  "#7ad151",
  "#fde725",
]

const greys = [
  "#f7f7f7",
  "#d9d9d9",
  "#bdbdbd",
  "#969696",
  "#636363",
  "#252525",
]

function FourDirectionWindRose() {
  const testData = makeTableData({
    bins: defaultBins,
    directions: ["N", "E", "S", "W"],
  });

  return (
    <WindRose
      data={testData}
      bins={defaultBins}
      width={600}
      height={600}
      colorScheme={viridisColorScheme}
    />
  );
}

function EightDirectionWindRose() {
  const testData = makeTableData({
    bins: defaultBins,
    directions: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
  });

  return (
    <WindRose
      data={testData}
      bins={defaultBins}
      width={600}
      height={600}
      colorScheme={greys}
    />
  );
}
