export type BinsPoint<TBinKeys extends string> = {
  [key in TBinKeys]: number;
};

export type DefaultWindroseProps<TDirection extends string = string> = {
  direction: TDirection;
  total: number;
};

export type WindroseDataPoint<
  TBinKeys extends string,
  TDirection extends string = string,
> = Prettify<BinsPoint<TBinKeys> & DefaultWindroseProps<TDirection>>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
