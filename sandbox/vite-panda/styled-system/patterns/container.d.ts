/* eslint-disable */
import type { Tokens } from "../tokens/index"
import type { Properties } from "../types/csstype"
import type { ConditionalValue, SystemStyleObject } from "../types/index"
import type { SystemProperties } from "../types/style-props"
import type { DistributiveOmit } from "../types/system-types"

export interface ContainerProperties {}

interface ContainerStyles
  extends
    ContainerProperties,
    DistributiveOmit<SystemStyleObject, keyof ContainerProperties> {}

interface ContainerPatternFn {
  (styles?: ContainerStyles): string
  raw: (styles?: ContainerStyles) => SystemStyleObject
}

export declare const container: ContainerPatternFn
