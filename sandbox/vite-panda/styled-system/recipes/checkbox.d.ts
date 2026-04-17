/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CheckboxVariant {
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg"
  /**
   * @default "solid"
   */
  variant: "outline" | "solid" | "subtle"
}

type CheckboxVariantMap = {
  [key in keyof CheckboxVariant]: Array<CheckboxVariant[key]>
}

type CheckboxSlot = "root" | "label" | "control" | "indicator" | "group"

export type CheckboxVariantProps = {
  [key in keyof CheckboxVariant]?:
    | ConditionalValue<CheckboxVariant[key]>
    | undefined
}

export interface CheckboxRecipe {
  __slot: CheckboxSlot
  __type: CheckboxVariantProps;
  (props?: CheckboxVariantProps): Pretty<Record<CheckboxSlot, string>>
  raw: (props?: CheckboxVariantProps) => CheckboxVariantProps
  variantMap: CheckboxVariantMap
  variantKeys: Array<keyof CheckboxVariant>
  splitVariantProps<Props extends CheckboxVariantProps>(
    props: Props,
  ): [
    CheckboxVariantProps,
    Pretty<DistributiveOmit<Props, keyof CheckboxVariantProps>>,
  ]
  getVariantProps: (props?: CheckboxVariantProps) => CheckboxVariantProps
}

export declare const checkbox: CheckboxRecipe
