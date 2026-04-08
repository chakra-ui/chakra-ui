/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CheckmarkVariant {
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg"
  /**
   * @default "solid"
   */
  variant: "solid" | "outline" | "subtle" | "plain" | "inverted"
  filled: boolean
}

type CheckmarkVariantMap = {
  [key in keyof CheckmarkVariant]: Array<CheckmarkVariant[key]>
}

export type CheckmarkVariantProps = {
  [key in keyof CheckmarkVariant]?:
    | ConditionalValue<CheckmarkVariant[key]>
    | undefined
}

export interface CheckmarkRecipe {
  __type: CheckmarkVariantProps;
  (props?: CheckmarkVariantProps): string
  raw: (props?: CheckmarkVariantProps) => CheckmarkVariantProps
  variantMap: CheckmarkVariantMap
  variantKeys: Array<keyof CheckmarkVariant>
  splitVariantProps<Props extends CheckmarkVariantProps>(
    props: Props,
  ): [
    CheckmarkVariantProps,
    Pretty<DistributiveOmit<Props, keyof CheckmarkVariantProps>>,
  ]
  getVariantProps: (props?: CheckmarkVariantProps) => CheckmarkVariantProps
}

export declare const checkmark: CheckmarkRecipe
