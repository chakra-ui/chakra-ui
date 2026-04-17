/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ButtonVariant {
  /**
   * @default "md"
   */
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /**
   * @default "solid"
   */
  variant: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain"
}

type ButtonVariantMap = {
  [key in keyof ButtonVariant]: Array<ButtonVariant[key]>
}

export type ButtonVariantProps = {
  [key in keyof ButtonVariant]?:
    | ConditionalValue<ButtonVariant[key]>
    | undefined
}

export interface ButtonRecipe {
  __type: ButtonVariantProps;
  (props?: ButtonVariantProps): string
  raw: (props?: ButtonVariantProps) => ButtonVariantProps
  variantMap: ButtonVariantMap
  variantKeys: Array<keyof ButtonVariant>
  splitVariantProps<Props extends ButtonVariantProps>(
    props: Props,
  ): [
    ButtonVariantProps,
    Pretty<DistributiveOmit<Props, keyof ButtonVariantProps>>,
  ]
  getVariantProps: (props?: ButtonVariantProps) => ButtonVariantProps
}

export declare const button: ButtonRecipe
