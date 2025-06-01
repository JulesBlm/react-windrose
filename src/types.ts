export type BinsPoint<TBinKeys extends string> = {
  [key in TBinKeys]: number;
};

export type DefaultWindroseProps<TDirection = string> = {
  direction: TDirection;
  total: number;
};

export type WindroseDataPoint<
  TBinKeys extends string,
  TDirection = string,
> = Prettify<BinsPoint<TBinKeys> & DefaultWindroseProps<TDirection>>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
