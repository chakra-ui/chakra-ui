/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface CircleProperties {
  size?: SystemProperties["width"]
}

interface CircleStyles
  extends
    CircleProperties,
    DistributiveOmit<SystemStyleObject, keyof CircleProperties> {}

interface CirclePatternFn {
  (styles?: CircleStyles): string
  raw: (styles?: CircleStyles) => SystemStyleObject
}

export declare const circle: CirclePatternFn
