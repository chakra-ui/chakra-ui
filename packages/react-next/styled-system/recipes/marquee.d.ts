/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface MarqueeVariant {}

type MarqueeVariantMap = {
  [key in keyof MarqueeVariant]: Array<MarqueeVariant[key]>
}

type MarqueeSlot = "root" | "viewport" | "content" | "edge" | "item"

export type MarqueeVariantProps = {
  [key in keyof MarqueeVariant]?:
    | ConditionalValue<MarqueeVariant[key]>
    | undefined
}

export interface MarqueeRecipe {
  __slot: MarqueeSlot
  __type: MarqueeVariantProps;
  (props?: MarqueeVariantProps): Pretty<Record<MarqueeSlot, string>>
  raw: (props?: MarqueeVariantProps) => MarqueeVariantProps
  variantMap: MarqueeVariantMap
  variantKeys: Array<keyof MarqueeVariant>
  splitVariantProps<Props extends MarqueeVariantProps>(
    props: Props,
  ): [
    MarqueeVariantProps,
    Pretty<DistributiveOmit<Props, keyof MarqueeVariantProps>>,
  ]
  getVariantProps: (props?: MarqueeVariantProps) => MarqueeVariantProps
}

export declare const marquee: MarqueeRecipe
