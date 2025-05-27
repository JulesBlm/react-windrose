import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useWindRose } from "./use-windrose.js";
import { blueColorScheme } from "./util.js";

describe("useWindRose hook", () => {
  const mockData = [
    { direction: "N", bin1: 10, bin2: 5, total: 15 },
    { direction: "NE", bin1: 8, bin2: 3, total: 11 },
    { direction: "E", bin1: 12, bin2: 7, total: 19 },
    { direction: "SE", bin1: 6, bin2: 2, total: 8 },
  ];

  const defaultProps = {
    data: mockData,
    bins: ["bin1", "bin2"] as const,
    directions: ["N", "NE", "E", "SE"],
    innerRadius: 20,
    outerRadius: 100,
    colorScheme: blueColorScheme,
    padAngle: 0.01,
  };

  it("should return all required properties", () => {
    const { result } = renderHook(() => useWindRose(defaultProps));

    expect(result.current).toHaveProperty("xScale");
    expect(result.current).toHaveProperty("yScale");
    expect(result.current).toHaveProperty("colorScale");
    expect(result.current).toHaveProperty("arcGenerator");
    expect(result.current).toHaveProperty("stackedData");
    expect(result.current).toHaveProperty("angleStep");
    expect(result.current).toHaveProperty("angleOffset");
  });

  it("should calculate correct angle step and offset", () => {
    const { result } = renderHook(() => useWindRose(defaultProps));

    expect(result.current.angleStep).toBe(360 / mockData.length);
    expect(result.current.angleOffset).toBe(-result.current.angleStep / 2);
  });

  it("should create scales with correct domains and ranges", () => {
    const { result } = renderHook(() => useWindRose(defaultProps));

    // Test xScale domain
    expect(result.current.xScale.domain()).toEqual(["N", "NE", "E", "SE"]);

    // Test yScale domain
    expect(result.current.yScale.domain()).toEqual([0, 19]); // max total is 19
    expect(result.current.yScale.range()).toEqual([20, 100]);

    // Test colorScale domain
    expect(result.current.colorScale.domain()).toEqual(["bin1", "bin2"]);
  });

  it("should use custom maxY when provided", () => {
    const customProps = { ...defaultProps, maxY: 50 };
    const { result } = renderHook(() => useWindRose(customProps));

    expect(result.current.yScale.domain()).toEqual([0, 50]);
  });

  it("should handle empty data", () => {
    const emptyProps = { ...defaultProps, data: [] };
    const { result } = renderHook(() => useWindRose(emptyProps));

    expect(result.current.angleStep).toBe(Infinity);
    expect(result.current.stackedData).toHaveLength(2); // bins length
  });

  it("should memoize scales correctly on data change", () => {
    const { result, rerender } = renderHook((props) => useWindRose(props), {
      initialProps: defaultProps,
    });

    const initialXScale = result.current.xScale;
    const initialYScale = result.current.yScale;
    const initialColorScale = result.current.colorScale;

    // Change data but keep other props same
    const newData = [
      { direction: "N", bin1: 15, bin2: 8, total: 23 },
      { direction: "NE", bin1: 12, bin2: 6, total: 18 },
    ];

    rerender({ ...defaultProps, data: newData });

    // xScale and colorScale should be the same (same directions/bins)
    expect(result.current.xScale).toBe(initialXScale);
    expect(result.current.colorScale).toBe(initialColorScale);

    // yScale should change due to different maxY
    expect(result.current.yScale).not.toBe(initialYScale);
    expect(result.current.yScale.domain()).toEqual([0, 23]);
  });

  it("should generate stacked data with correct structure", () => {
    const { result } = renderHook(() => useWindRose(defaultProps));

    expect(result.current.stackedData).toHaveLength(2); // number of bins
    expect(result.current.stackedData[0]).toHaveLength(4); // number of data points

    // Check first bin data
    const firstBin = result.current.stackedData[0]!;
    expect(firstBin.key).toBe("bin1");
    expect(firstBin[0][0]).toBe(0); // start of first segment
    expect(firstBin[0][1]).toBe(10); // end of first segment (bin1 value)
  });
});
