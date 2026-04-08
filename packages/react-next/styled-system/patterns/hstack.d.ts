/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface HstackProperties {
  justify?: SystemProperties["justifyContent"]
  gap?: SystemProperties["gap"]
}

interface HstackStyles
  extends
    HstackProperties,
    DistributiveOmit<SystemStyleObject, keyof HstackProperties> {}

interface HstackPatternFn {
  (styles?: HstackStyles): string
  raw: (styles?: HstackStyles) => SystemStyleObject
}

export declare const hstack: HstackPatternFn
