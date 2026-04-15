/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface StackProperties {
  align?: SystemProperties["alignItems"]
  justify?: SystemProperties["justifyContent"]
  direction?: SystemProperties["flexDirection"]
  gap?: SystemProperties["gap"]
}

interface StackStyles
  extends
    StackProperties,
    DistributiveOmit<SystemStyleObject, keyof StackProperties> {}

interface StackPatternFn {
  (styles?: StackStyles): string
  raw: (styles?: StackStyles) => SystemStyleObject
}

export declare const stack: StackPatternFn
