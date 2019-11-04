declare module "pretty-num" {
  export enum PRECISION_SETTING {
    REDUCE = 1,
    REDUCE_SIGNIFICANT = 2,
    FIXED = 3,
    INCREASE = 4,
  }

  export enum ROUNDING_MODE {
    UP = 1,
    DOWN = 2,
    CEIL = 3,
    FLOOR = 4,
    HALF_UP = 5,
    HALF_DOWN = 6,
    HALF_EVEN = 7,
  }

  export interface PrettyNumOptions {
    precision?: number;
    precisionSetting?: PRECISION_SETTING;
    roundingMode?: ROUNDING_MODE;
    thousandsSeparator?: string;
  }

  export default function prettyNum(
    num: number,
    options: PrettyNumOptions,
  ): number;
}
