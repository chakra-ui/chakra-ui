/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface NativeSelectVariant {
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle" | "plain" | "ghost"
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg" | "xl"
}

type NativeSelectVariantMap = {
  [key in keyof NativeSelectVariant]: Array<NativeSelectVariant[key]>
}

type NativeSelectSlot = "root" | "field" | "indicator"

export type NativeSelectVariantProps = {
  [key in keyof NativeSelectVariant]?:
    | ConditionalValue<NativeSelectVariant[key]>
    | undefined
}

export interface NativeSelectRecipe {
  __slot: NativeSelectSlot
  __type: NativeSelectVariantProps;
  (props?: NativeSelectVariantProps): Pretty<Record<NativeSelectSlot, string>>
  raw: (props?: NativeSelectVariantProps) => NativeSelectVariantProps
  variantMap: NativeSelectVariantMap
  variantKeys: Array<keyof NativeSelectVariant>
  splitVariantProps<Props extends NativeSelectVariantProps>(
    props: Props,
  ): [
    NativeSelectVariantProps,
    Pretty<DistributiveOmit<Props, keyof NativeSelectVariantProps>>,
  ]
  getVariantProps: (
    props?: NativeSelectVariantProps,
  ) => NativeSelectVariantProps
}

export declare const nativeSelect: NativeSelectRecipe
