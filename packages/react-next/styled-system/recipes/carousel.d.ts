/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CarouselVariant {}

type CarouselVariantMap = {
  [key in keyof CarouselVariant]: Array<CarouselVariant[key]>
}

type CarouselSlot =
  | "root"
  | "itemGroup"
  | "item"
  | "control"
  | "nextTrigger"
  | "prevTrigger"
  | "indicatorGroup"
  | "indicator"
  | "autoplayTrigger"
  | "progressText"
  | "progressText"
  | "autoplayIndicator"

export type CarouselVariantProps = {
  [key in keyof CarouselVariant]?:
    | ConditionalValue<CarouselVariant[key]>
    | undefined
}

export interface CarouselRecipe {
  __slot: CarouselSlot
  __type: CarouselVariantProps;
  (props?: CarouselVariantProps): Pretty<Record<CarouselSlot, string>>
  raw: (props?: CarouselVariantProps) => CarouselVariantProps
  variantMap: CarouselVariantMap
  variantKeys: Array<keyof CarouselVariant>
  splitVariantProps<Props extends CarouselVariantProps>(
    props: Props,
  ): [
    CarouselVariantProps,
    Pretty<DistributiveOmit<Props, keyof CarouselVariantProps>>,
  ]
  getVariantProps: (props?: CarouselVariantProps) => CarouselVariantProps
}

export declare const carousel: CarouselRecipe
