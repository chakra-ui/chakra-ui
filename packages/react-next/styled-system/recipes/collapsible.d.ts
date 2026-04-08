/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CollapsibleVariant {}

type CollapsibleVariantMap = {
  [key in keyof CollapsibleVariant]: Array<CollapsibleVariant[key]>
}

type CollapsibleSlot = "root" | "trigger" | "content" | "indicator"

export type CollapsibleVariantProps = {
  [key in keyof CollapsibleVariant]?:
    | ConditionalValue<CollapsibleVariant[key]>
    | undefined
}

export interface CollapsibleRecipe {
  __slot: CollapsibleSlot
  __type: CollapsibleVariantProps;
  (props?: CollapsibleVariantProps): Pretty<Record<CollapsibleSlot, string>>
  raw: (props?: CollapsibleVariantProps) => CollapsibleVariantProps
  variantMap: CollapsibleVariantMap
  variantKeys: Array<keyof CollapsibleVariant>
  splitVariantProps<Props extends CollapsibleVariantProps>(
    props: Props,
  ): [
    CollapsibleVariantProps,
    Pretty<DistributiveOmit<Props, keyof CollapsibleVariantProps>>,
  ]
  getVariantProps: (props?: CollapsibleVariantProps) => CollapsibleVariantProps
}

export declare const collapsible: CollapsibleRecipe
