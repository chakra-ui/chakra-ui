/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface StepsVariant {
  /**
   * @default "horizontal"
   */
  orientation: "vertical" | "horizontal"
  /**
   * @default "solid"
   */
  variant: "solid" | "subtle"
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg"
}

type StepsVariantMap = {
  [key in keyof StepsVariant]: Array<StepsVariant[key]>
}

type StepsSlot =
  | "root"
  | "list"
  | "item"
  | "trigger"
  | "indicator"
  | "separator"
  | "content"
  | "title"
  | "description"
  | "nextTrigger"
  | "prevTrigger"
  | "progress"

export type StepsVariantProps = {
  [key in keyof StepsVariant]?: ConditionalValue<StepsVariant[key]> | undefined
}

export interface StepsRecipe {
  __slot: StepsSlot
  __type: StepsVariantProps;
  (props?: StepsVariantProps): Pretty<Record<StepsSlot, string>>
  raw: (props?: StepsVariantProps) => StepsVariantProps
  variantMap: StepsVariantMap
  variantKeys: Array<keyof StepsVariant>
  splitVariantProps<Props extends StepsVariantProps>(
    props: Props,
  ): [
    StepsVariantProps,
    Pretty<DistributiveOmit<Props, keyof StepsVariantProps>>,
  ]
  getVariantProps: (props?: StepsVariantProps) => StepsVariantProps
}

export declare const steps: StepsRecipe
