/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface SplitterVariant {}

type SplitterVariantMap = {
  [key in keyof SplitterVariant]: Array<SplitterVariant[key]>
}

type SplitterSlot =
  | "root"
  | "panel"
  | "resizeTrigger"
  | "resizeTriggerIndicator"
  | "resizeTriggerSeparator"
  | "resizeTriggerIndicator"

export type SplitterVariantProps = {
  [key in keyof SplitterVariant]?:
    | ConditionalValue<SplitterVariant[key]>
    | undefined
}

export interface SplitterRecipe {
  __slot: SplitterSlot
  __type: SplitterVariantProps;
  (props?: SplitterVariantProps): Pretty<Record<SplitterSlot, string>>
  raw: (props?: SplitterVariantProps) => SplitterVariantProps
  variantMap: SplitterVariantMap
  variantKeys: Array<keyof SplitterVariant>
  splitVariantProps<Props extends SplitterVariantProps>(
    props: Props,
  ): [
    SplitterVariantProps,
    Pretty<DistributiveOmit<Props, keyof SplitterVariantProps>>,
  ]
  getVariantProps: (props?: SplitterVariantProps) => SplitterVariantProps
}

export declare const splitter: SplitterRecipe
