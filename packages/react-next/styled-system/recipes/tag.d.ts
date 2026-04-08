/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface TagVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg" | "xl"
  /**
   * @default "surface"
   */
  variant: "subtle" | "solid" | "outline" | "surface"
}

type TagVariantMap = {
  [key in keyof TagVariant]: Array<TagVariant[key]>
}

type TagSlot = "root" | "label" | "closeTrigger" | "startElement" | "endElement"

export type TagVariantProps = {
  [key in keyof TagVariant]?: ConditionalValue<TagVariant[key]> | undefined
}

export interface TagRecipe {
  __slot: TagSlot
  __type: TagVariantProps;
  (props?: TagVariantProps): Pretty<Record<TagSlot, string>>
  raw: (props?: TagVariantProps) => TagVariantProps
  variantMap: TagVariantMap
  variantKeys: Array<keyof TagVariant>
  splitVariantProps<Props extends TagVariantProps>(
    props: Props,
  ): [TagVariantProps, Pretty<DistributiveOmit<Props, keyof TagVariantProps>>]
  getVariantProps: (props?: TagVariantProps) => TagVariantProps
}

export declare const tag: TagRecipe
