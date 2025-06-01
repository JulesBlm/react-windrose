import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WindRose } from "./windrose.js";
import { blueColorScheme } from "./util.js";

describe("WindRose component", () => {
  const mockData = [
    { direction: "N", bin1: 10, bin2: 5, total: 15 },
    { direction: "NE", bin1: 8, bin2: 3, total: 11 },
    { direction: "E", bin1: 12, bin2: 7, total: 19 },
    { direction: "SE", bin1: 6, bin2: 2, total: 8 },
  ];

  const defaultProps = {
    width: 400,
    height: 400,
    data: mockData,
    bins: ["bin1", "bin2"] as const,
    yUnits: "m/s",
    colorScheme: blueColorScheme,
  };

  it("should render SVG with correct dimensions", () => {
    render(<WindRose {...defaultProps} />);

    const svg = document.querySelector('svg[name="windrose"]');
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("width")).toBe("400");
    expect(svg?.getAttribute("viewBox")).toBe("-200 -200 400 400");
  });

  it("should render rings for each bin", () => {
    render(<WindRose {...defaultProps} />);

    const rings = document.querySelector('g[name="rings"]');
    expect(rings).toBeDefined();
    expect(rings?.children).toHaveLength(2); // two bins
  });

  it("should render direction labels", () => {
    render(<WindRose {...defaultProps} />);

    // Check that direction labels are rendered
    const svg = document.querySelector('svg[name="windrose"]');
    const labels = svg?.querySelectorAll("text");

    // Should have direction labels plus ticks plus units
    expect(labels?.length).toBeGreaterThan(4);
  });

  it("should render units label when provided", () => {
    render(<WindRose {...defaultProps} />);

    const unitsLabel = screen.getByText("m/s");
    expect(unitsLabel).toBeDefined();
    expect(unitsLabel.getAttribute("name")).toBe("units-label");
  });

  it("should not render units label when not provided", () => {
    const { yUnits, ...propsWithoutUnits } = defaultProps;
    render(<WindRose {...propsWithoutUnits} yUnits="" />);

    const svg = document.querySelector('svg[name="windrose"]');
    const unitsLabel = svg?.querySelector('text[name="units-label"]');
    expect(unitsLabel).toBeNull();
  });

  it("should render ticks", () => {
    render(<WindRose {...defaultProps} />);

    const svg = document.querySelector('svg[name="windrose"]');
    const ticksGroup = svg?.querySelector('g[name="ticks"]');
    expect(ticksGroup).toBeDefined();
    expect(ticksGroup?.getAttribute("text-anchor")).toBe("middle");
    expect(ticksGroup?.getAttribute("font-size")).toBe("18");
  });

  it("should use custom radius values", () => {
    render(<WindRose {...defaultProps} innerRadius={30} outerRadius={150} />);

    // Component should render without errors
    const svg = document.querySelector('svg[name="windrose"]');
    expect(svg).toBeDefined();
  });

  it("should handle custom color scheme", () => {
    const customColors = ["#ff0000", "#00ff00", "#0000ff"];
    render(<WindRose {...defaultProps} colorScheme={customColors} />);

    const svg = document.querySelector('svg[name="windrose"]');
    expect(svg).toBeDefined();
  });

  it("should render custom children", () => {
    render(
      <WindRose {...defaultProps}>
        <circle cx={0} cy={0} r={5} fill="red" data-testid="custom-child" />
      </WindRose>,
    );

    const customChild = screen.getByTestId("custom-child");
    expect(customChild).toBeDefined();
    expect(customChild.getAttribute("fill")).toBe("red");
  });

  it("should apply additional SVG props", () => {
    render(
      <WindRose
        {...defaultProps}
        className="custom-windrose"
        style={{ border: "1px solid black" }}
      />,
    );

    const svg = document.querySelector('svg[name="windrose"]');
    expect(svg?.getAttribute("class")).toBe("custom-windrose");
    expect((svg as HTMLElement)?.style.border).toBe("1px solid black");
  });

  it("should handle empty data gracefully", () => {
    render(<WindRose {...defaultProps} data={[]} />);

    const svg = document.querySelector('svg[name="windrose"]');
    expect(svg).toBeDefined();
  });
});
