/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface SeparatorVariant {
  /**
   * @default "solid"
   */
  variant: "solid" | "dashed" | "dotted"
  /**
   * @default "horizontal"
   */
  orientation: "vertical" | "horizontal"
  /**
   * @default "sm"
   */
  size: "xs" | "sm" | "md" | "lg"
}

type SeparatorVariantMap = {
  [key in keyof SeparatorVariant]: Array<SeparatorVariant[key]>
}

export type SeparatorVariantProps = {
  [key in keyof SeparatorVariant]?:
    | ConditionalValue<SeparatorVariant[key]>
    | undefined
}

export interface SeparatorRecipe {
  __type: SeparatorVariantProps;
  (props?: SeparatorVariantProps): string
  raw: (props?: SeparatorVariantProps) => SeparatorVariantProps
  variantMap: SeparatorVariantMap
  variantKeys: Array<keyof SeparatorVariant>
  splitVariantProps<Props extends SeparatorVariantProps>(
    props: Props,
  ): [
    SeparatorVariantProps,
    Pretty<DistributiveOmit<Props, keyof SeparatorVariantProps>>,
  ]
  getVariantProps: (props?: SeparatorVariantProps) => SeparatorVariantProps
}

export declare const separator: SeparatorRecipe
