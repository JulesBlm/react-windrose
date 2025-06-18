export type BinsPoint<TBinKeys extends string> = {
  [key in TBinKeys]: number;
};

export type DirectionData<TDirection = string> = {
  direction: TDirection;
};

export type WindroseDataPoint<
  TBinKeys extends string,
  TDirection = string,
> = Prettify<BinsPoint<TBinKeys> & DirectionData<TDirection>>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
