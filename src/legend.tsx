import type { SVGProps } from "react";

export interface BaseLegendProps extends SVGProps<SVGGElement> {
  /** Array of labels of the bins for each legend entry */
  bins: ReadonlyArray<string>;
  /** Array of colors to use for each legend entry */
  colorScheme: ReadonlyArray<string>;
  /** Width of the legend symbol in pixels */
  symbolWidth?: number;
  /** Height of the legend symbol in pixels */
  symbolHeight?: number;
  /** Additional spacing between legend entries in pixels (added to symbolHeight) */
  spacing?: number;
  /** Horizontal offset for the text label in pixels */
  textX?: number;
  /** Vertical offset for the text label in pixels */
  textY?: number;
  /** Additional props to pass to the text elements */
  textProps?: React.SVGProps<SVGTextElement>;
  /** Optional children to render inside the legend group, useful for adding a title or a background */
  children?: React.ReactNode;
}
export interface RectLegendProps extends BaseLegendProps {
  symbol?: "rect";
  /** Additional props to pass to the rectangle elements */
  symbolProps?: React.SVGProps<SVGRectElement>;
}

export interface CircleLegendProps extends BaseLegendProps {
  symbol: "circle";
  /** Additional props to pass to the circle elements */
  symbolProps?: React.SVGProps<SVGCircleElement>;
}

export type LegendProps = RectLegendProps | CircleLegendProps;

/**
 * Renders a vertical legend for a windrose chart
 * @param props - The component props
 * @returns An SVG group element containing the legend
 */
export function VerticalLegend({
  bins,
  colorScheme,
  symbolWidth = 18,
  symbolHeight = symbolWidth,
  spacing = 2,
  textX = symbolWidth + 4,
  textY = symbolWidth / 2,
  symbol = "rect",
  symbolProps,
  textProps,
  children,
  ...props
}: LegendProps) {
  if (colorScheme.length < bins.length) {
    throw new Error("Color scheme must at least as long as bins");
  }
  const legendColorScheme = colorScheme.slice(0, bins.length).toReversed();
  const totalSpacing = symbolHeight + spacing;

  return (
    <g name="legend" {...props}>
      {children}
      {[...bins].toReversed().map((legendEntry, index) => {
        return (
          <g
            transform={`translate(0,${index * totalSpacing})`}
            key={legendEntry}
          >
            {symbol === "rect" ? (
              <rect
                fill={legendColorScheme[index]}
                width={symbolWidth}
                height={symbolHeight}
                stroke="black"
                {...(symbolProps as React.SVGProps<SVGRectElement>)}
              />
            ) : (
              <circle
                fill={legendColorScheme[index]}
                r={symbolWidth / 2}
                cx={symbolWidth / 2}
                cy={symbolHeight / 2}
                stroke="black"
                {...(symbolProps as React.SVGProps<SVGCircleElement>)}
              />
            )}
            <text
              x={textX}
              y={textY}
              dominantBaseline="middle"
              fontSize={13}
              {...textProps}
            >
              {legendEntry}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/**
 * Renders a horizontal legend for a windrose chart
 * @param props - The component props
 * @returns An SVG group element containing the legend
 */
export function HorizontalLegend({
  bins,
  colorScheme,
  symbolWidth = 20,
  symbolHeight = symbolWidth,
  spacing = 2,
  textX = symbolWidth / 2,
  textY = 1.5 * symbolHeight,
  symbol = "rect",
  symbolProps,
  textProps,
  children,
  ...props
}: LegendProps) {
  if (colorScheme.length < bins.length) {
    throw new Error("Color scheme must at least as long as bins");
  }
  const legendColorScheme = colorScheme.slice(0, bins.length);
  const totalSpacing = symbolWidth + spacing;

  return (
    <g name="legend" {...props}>
      {children}
      {[...bins].map((legendEntry, index) => {
        return (
          <g
            transform={`translate(${totalSpacing * index},0)`}
            key={legendEntry}
          >
            {symbol === "rect" ? (
              <rect
                fill={legendColorScheme[index]}
                width={symbolWidth}
                height={symbolHeight}
                stroke="black"
                {...(symbolProps as React.SVGProps<SVGRectElement>)}
              />
            ) : (
              <circle
                fill={legendColorScheme[index]}
                r={symbolWidth / 2}
                cx={symbolWidth / 2}
                cy={symbolHeight / 2}
                stroke="black"
                {...(symbolProps as React.SVGProps<SVGCircleElement>)}
              />
            )}
            <text
              x={textX}
              y={textY}
              fontSize={11}
              textAnchor="middle"
              {...textProps}
            >
              {legendEntry}
            </text>
          </g>
        );
      })}
    </g>
  );
}
