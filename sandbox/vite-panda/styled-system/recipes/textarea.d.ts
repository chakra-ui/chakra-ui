/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface TextareaVariant {
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg" | "xl"
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle" | "flushed"
}

type TextareaVariantMap = {
  [key in keyof TextareaVariant]: Array<TextareaVariant[key]>
}

export type TextareaVariantProps = {
  [key in keyof TextareaVariant]?:
    | ConditionalValue<TextareaVariant[key]>
    | undefined
}

export interface TextareaRecipe {
  __type: TextareaVariantProps;
  (props?: TextareaVariantProps): string
  raw: (props?: TextareaVariantProps) => TextareaVariantProps
  variantMap: TextareaVariantMap
  variantKeys: Array<keyof TextareaVariant>
  splitVariantProps<Props extends TextareaVariantProps>(
    props: Props,
  ): [
    TextareaVariantProps,
    Pretty<DistributiveOmit<Props, keyof TextareaVariantProps>>,
  ]
  getVariantProps: (props?: TextareaVariantProps) => TextareaVariantProps
}

export declare const textarea: TextareaRecipe
