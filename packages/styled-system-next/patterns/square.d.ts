/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface SquareProperties {
  size?: SystemProperties["width"]
}

interface SquareStyles
  extends
    SquareProperties,
    DistributiveOmit<SystemStyleObject, keyof SquareProperties> {}

interface SquarePatternFn {
  (styles?: SquareStyles): string
  raw: (styles?: SquareStyles) => SystemStyleObject
}

export declare const square: SquarePatternFn
