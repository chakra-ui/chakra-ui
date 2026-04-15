/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface LinkOverlayProperties {}

interface LinkOverlayStyles
  extends
    LinkOverlayProperties,
    DistributiveOmit<SystemStyleObject, keyof LinkOverlayProperties> {}

interface LinkOverlayPatternFn {
  (styles?: LinkOverlayStyles): string
  raw: (styles?: LinkOverlayStyles) => SystemStyleObject
}

export declare const linkOverlay: LinkOverlayPatternFn
