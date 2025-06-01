import { describe, expect, it } from "vitest";
import { blueColorScheme, radians, sumRow, TURN } from "./util.js";

describe("util functions", () => {
  describe("sumRow", () => {
    const bins = ["bin1", "bin2", "bin3"];
    it("should sum all numeric values except direction", () => {
      const row = {
        direction: "N",
        bin1: 10,
        bin2: 20,
        bin3: 5,
      };

      expect(sumRow(row, bins)).toBe(35);
    });

    it("should handle string numbers", () => {
      const row = {
        direction: "NE",
        bin1: "15",
        bin2: "25",
      };

      expect(sumRow(row, bins)).toBe(40);
    });

    it("should return 0 for empty bins", () => {
      const row = {
        direction: "S",
      };

      expect(sumRow(row, bins)).toBe(0);
    });

    it("should handle zero values", () => {
      const row = {
        direction: "W",
        bin1: 0,
        bin2: 0,
        bin3: 10,
      };

      expect(sumRow(row, bins)).toBe(10);
    });
  });

  describe("radians", () => {
    it("should convert degrees to radians", () => {
      expect(radians(0)).toBe(0);
      expect(radians(90)).toBeCloseTo(Math.PI / 2);
      expect(radians(180)).toBeCloseTo(Math.PI);
      expect(radians(360)).toBeCloseTo(2 * Math.PI);
    });

    it("should handle negative degrees", () => {
      expect(radians(-90)).toBeCloseTo(-Math.PI / 2);
    });

    it("should handle decimal degrees", () => {
      expect(radians(45.5)).toBeCloseTo((45.5 * Math.PI) / 180);
    });
  });

  describe("constants", () => {
    it("should have correct TURN value", () => {
      expect(TURN).toBe(360);
    });

    it("should have blue color scheme with 9 colors", () => {
      expect(blueColorScheme).toHaveLength(9);
      expect(blueColorScheme[0]).toBe("#c6dbef");
      expect(blueColorScheme[8]).toBe("#003d82");
    });
  });
});
