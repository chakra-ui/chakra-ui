/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ColorSwatchVariant {
  /**
   * @default "md"
   */
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit" | "full"
  /**
   * @default "rounded"
   */
  shape: "square" | "circle" | "rounded"
}

type ColorSwatchVariantMap = {
  [key in keyof ColorSwatchVariant]: Array<ColorSwatchVariant[key]>
}

export type ColorSwatchVariantProps = {
  [key in keyof ColorSwatchVariant]?:
    | ConditionalValue<ColorSwatchVariant[key]>
    | undefined
}

export interface ColorSwatchRecipe {
  __type: ColorSwatchVariantProps;
  (props?: ColorSwatchVariantProps): string
  raw: (props?: ColorSwatchVariantProps) => ColorSwatchVariantProps
  variantMap: ColorSwatchVariantMap
  variantKeys: Array<keyof ColorSwatchVariant>
  splitVariantProps<Props extends ColorSwatchVariantProps>(
    props: Props,
  ): [
    ColorSwatchVariantProps,
    Pretty<DistributiveOmit<Props, keyof ColorSwatchVariantProps>>,
  ]
  getVariantProps: (props?: ColorSwatchVariantProps) => ColorSwatchVariantProps
}

export declare const colorSwatch: ColorSwatchRecipe
