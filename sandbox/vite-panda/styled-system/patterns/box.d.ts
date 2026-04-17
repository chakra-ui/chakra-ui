/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface BoxProperties {}

interface BoxStyles
  extends
    BoxProperties,
    DistributiveOmit<SystemStyleObject, keyof BoxProperties> {}

interface BoxPatternFn {
  (styles?: BoxStyles): string
  raw: (styles?: BoxStyles) => SystemStyleObject
}

export declare const box: BoxPatternFn
