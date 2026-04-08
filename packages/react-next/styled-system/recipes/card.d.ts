/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CardVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
  /**
   * @default "outline"
   */
  variant: "elevated" | "outline" | "subtle"
}

type CardVariantMap = {
  [key in keyof CardVariant]: Array<CardVariant[key]>
}

type CardSlot = "root" | "header" | "body" | "footer" | "title" | "description"

export type CardVariantProps = {
  [key in keyof CardVariant]?: ConditionalValue<CardVariant[key]> | undefined
}

export interface CardRecipe {
  __slot: CardSlot
  __type: CardVariantProps;
  (props?: CardVariantProps): Pretty<Record<CardSlot, string>>
  raw: (props?: CardVariantProps) => CardVariantProps
  variantMap: CardVariantMap
  variantKeys: Array<keyof CardVariant>
  splitVariantProps<Props extends CardVariantProps>(
    props: Props,
  ): [CardVariantProps, Pretty<DistributiveOmit<Props, keyof CardVariantProps>>]
  getVariantProps: (props?: CardVariantProps) => CardVariantProps
}

export declare const card: CardRecipe
