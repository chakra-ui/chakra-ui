/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CodeVariant {
  /**
   * @default "subtle"
   */
  variant: "solid" | "subtle" | "outline" | "surface" | "plain"
  /**
   * @default "sm"
   */
  size: "xs" | "sm" | "md" | "lg"
}

type CodeVariantMap = {
  [key in keyof CodeVariant]: Array<CodeVariant[key]>
}

export type CodeVariantProps = {
  [key in keyof CodeVariant]?: ConditionalValue<CodeVariant[key]> | undefined
}

export interface CodeRecipe {
  __type: CodeVariantProps;
  (props?: CodeVariantProps): string
  raw: (props?: CodeVariantProps) => CodeVariantProps
  variantMap: CodeVariantMap
  variantKeys: Array<keyof CodeVariant>
  splitVariantProps<Props extends CodeVariantProps>(
    props: Props,
  ): [CodeVariantProps, Pretty<DistributiveOmit<Props, keyof CodeVariantProps>>]
  getVariantProps: (props?: CodeVariantProps) => CodeVariantProps
}

export declare const code: CodeRecipe
