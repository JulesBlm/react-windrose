import WindRose, { defaultBins, defaultColorScheme, testData } from "./react-windrose";

export default function App() {
  return (
    <main>
      <section>
        <h2>default</h2>
        <WindRose
          data={testData}
          bins={defaultBins}
          width={600}
          height={600}
          binsTitle={"Bins"}
          binUnits={"(m/s)"}
          yUnits={"(m/s)"}
          colorSchemeColors={defaultColorScheme}
        />
      </section>
    </main>
  );
}
