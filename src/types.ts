import type { defaultBins } from "./app";
import type { cardinalDirections } from "./util";

type CardinalDirection = (typeof cardinalDirections)[number];
type ExampleBins = (typeof defaultBins)[number];

type BinsPoint<TBinKeys extends string> = {
  [key in TBinKeys]: number;
};

type DefaultWindroseProps<TDirection extends string = string> = {
  direction: TDirection;
  total: number;
};

export type WindroseDataPoint<
  TBinKeys extends string,
  TDirection extends string = string
> = Prettify<BinsPoint<TBinKeys> & DefaultWindroseProps<TDirection>>;

type WindroseDataPointTest = WindroseDataPoint<ExampleBins, CardinalDirection>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
