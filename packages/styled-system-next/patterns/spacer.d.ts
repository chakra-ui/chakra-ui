/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface SpacerProperties {
  size?: ConditionalValue<Tokens["spacing"]>
}

interface SpacerStyles
  extends
    SpacerProperties,
    DistributiveOmit<SystemStyleObject, keyof SpacerProperties> {}

interface SpacerPatternFn {
  (styles?: SpacerStyles): string
  raw: (styles?: SpacerStyles) => SystemStyleObject
}

export declare const spacer: SpacerPatternFn
