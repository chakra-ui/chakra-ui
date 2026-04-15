/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface WrapProperties {
  gap?: SystemProperties["gap"]
  rowGap?: SystemProperties["gap"]
  columnGap?: SystemProperties["gap"]
  align?: SystemProperties["alignItems"]
  justify?: SystemProperties["justifyContent"]
}

interface WrapStyles
  extends
    WrapProperties,
    DistributiveOmit<SystemStyleObject, keyof WrapProperties> {}

interface WrapPatternFn {
  (styles?: WrapStyles): string
  raw: (styles?: WrapStyles) => SystemStyleObject
}

export declare const wrap: WrapPatternFn
