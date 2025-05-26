import type { SVGProps } from "react";

export interface LegendProps extends SVGProps<SVGGElement>   {
  bins: Array<string>;
  colorScheme: Array<string> | ReadonlyArray<string>;
  rectWidth?: number;
  rectHeight?: number;
  spacingY?: number;
  textX?: number;
  textY?: number;
  rectProps?: React.SVGProps<SVGRectElement>;
  textProps?: React.SVGProps<SVGTextElement>;
  children?: React.ReactNode;
}

export function Legend({
  bins,
  colorScheme,
  rectWidth = 18,
  rectHeight = rectWidth,
  spacingY = rectWidth + 2,
  textX = rectWidth + 4,
  textY = rectWidth / 2,
  rectProps,
  textProps,
  children,
  ...props
}: LegendProps) {
  if (colorScheme.length < bins.length) {
    throw new Error("Color scheme must at least as long as bins");
  }
  const legendColorScheme = colorScheme.slice(0, bins.length).toReversed();

  return (
    <g name="legend" {...props}>
      {children}
      {[...bins].toReversed().map((legendEntry, index) => (
        <g transform={`translate(0,${index * spacingY})`} key={legendEntry}>
          <rect
            fill={legendColorScheme[index]}
            width={rectWidth}
            height={rectHeight}
            stroke="black"
            {...rectProps}
          />
          <text
            x={textX}
            y={textY}
            dominantBaseline="middle"
            fontFamily="sans-serif"
            fontSize={13}
            {...textProps}
          >
            {legendEntry}
          </text>
        </g>
      ))}
    </g>
  );
}
