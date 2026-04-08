/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface MarkVariant {
  variant: "subtle" | "solid" | "text" | "plain"
}

type MarkVariantMap = {
  [key in keyof MarkVariant]: Array<MarkVariant[key]>
}

export type MarkVariantProps = {
  [key in keyof MarkVariant]?: ConditionalValue<MarkVariant[key]> | undefined
}

export interface MarkRecipe {
  __type: MarkVariantProps;
  (props?: MarkVariantProps): string
  raw: (props?: MarkVariantProps) => MarkVariantProps
  variantMap: MarkVariantMap
  variantKeys: Array<keyof MarkVariant>
  splitVariantProps<Props extends MarkVariantProps>(
    props: Props,
  ): [MarkVariantProps, Pretty<DistributiveOmit<Props, keyof MarkVariantProps>>]
  getVariantProps: (props?: MarkVariantProps) => MarkVariantProps
}

export declare const mark: MarkRecipe
