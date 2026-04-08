/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface InputVariant {
  /**
   * @default "md"
   */
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle" | "flushed"
}

type InputVariantMap = {
  [key in keyof InputVariant]: Array<InputVariant[key]>
}

export type InputVariantProps = {
  [key in keyof InputVariant]?: ConditionalValue<InputVariant[key]> | undefined
}

export interface InputRecipe {
  __type: InputVariantProps;
  (props?: InputVariantProps): string
  raw: (props?: InputVariantProps) => InputVariantProps
  variantMap: InputVariantMap
  variantKeys: Array<keyof InputVariant>
  splitVariantProps<Props extends InputVariantProps>(
    props: Props,
  ): [
    InputVariantProps,
    Pretty<DistributiveOmit<Props, keyof InputVariantProps>>,
  ]
  getVariantProps: (props?: InputVariantProps) => InputVariantProps
}

export declare const input: InputRecipe
