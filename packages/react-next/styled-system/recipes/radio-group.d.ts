/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface RadioGroupVariant {
  /**
   * @default "solid"
   */
  variant: "outline" | "subtle" | "solid"
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg"
}

type RadioGroupVariantMap = {
  [key in keyof RadioGroupVariant]: Array<RadioGroupVariant[key]>
}

type RadioGroupSlot =
  | "root"
  | "label"
  | "item"
  | "itemText"
  | "itemControl"
  | "indicator"
  | "itemAddon"
  | "itemIndicator"

export type RadioGroupVariantProps = {
  [key in keyof RadioGroupVariant]?:
    | ConditionalValue<RadioGroupVariant[key]>
    | undefined
}

export interface RadioGroupRecipe {
  __slot: RadioGroupSlot
  __type: RadioGroupVariantProps;
  (props?: RadioGroupVariantProps): Pretty<Record<RadioGroupSlot, string>>
  raw: (props?: RadioGroupVariantProps) => RadioGroupVariantProps
  variantMap: RadioGroupVariantMap
  variantKeys: Array<keyof RadioGroupVariant>
  splitVariantProps<Props extends RadioGroupVariantProps>(
    props: Props,
  ): [
    RadioGroupVariantProps,
    Pretty<DistributiveOmit<Props, keyof RadioGroupVariantProps>>,
  ]
  getVariantProps: (props?: RadioGroupVariantProps) => RadioGroupVariantProps
}

export declare const radioGroup: RadioGroupRecipe
