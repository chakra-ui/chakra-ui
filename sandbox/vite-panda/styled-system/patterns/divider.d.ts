/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface DividerProperties {
  orientation?: ConditionalValue<"horizontal" | "vertical">
  thickness?: ConditionalValue<Tokens["sizes"] | Properties["borderWidth"]>
  color?: ConditionalValue<Tokens["colors"] | Properties["borderColor"]>
}

interface DividerStyles
  extends
    DividerProperties,
    DistributiveOmit<SystemStyleObject, keyof DividerProperties> {}

interface DividerPatternFn {
  (styles?: DividerStyles): string
  raw: (styles?: DividerStyles) => SystemStyleObject
}

export declare const divider: DividerPatternFn
