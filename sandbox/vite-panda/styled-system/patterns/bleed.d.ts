/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface BleedProperties {
  inline?: SystemProperties["marginInline"]
  block?: SystemProperties["marginBlock"]
}

interface BleedStyles
  extends
    BleedProperties,
    DistributiveOmit<SystemStyleObject, keyof BleedProperties> {}

interface BleedPatternFn {
  (styles?: BleedStyles): string
  raw: (styles?: BleedStyles) => SystemStyleObject
}

export declare const bleed: BleedPatternFn
