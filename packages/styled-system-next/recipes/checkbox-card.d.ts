/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CheckboxCardVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
  /**
   * @default "outline"
   */
  variant: "surface" | "subtle" | "outline" | "solid"
  justify: "start" | "end" | "center"
  /**
   * @default "start"
   */
  align: "start" | "end" | "center"
  /**
   * @default "horizontal"
   */
  orientation: "vertical" | "horizontal"
}

type CheckboxCardVariantMap = {
  [key in keyof CheckboxCardVariant]: Array<CheckboxCardVariant[key]>
}

type CheckboxCardSlot =
  | "root"
  | "control"
  | "label"
  | "description"
  | "addon"
  | "indicator"
  | "content"

export type CheckboxCardVariantProps = {
  [key in keyof CheckboxCardVariant]?:
    | ConditionalValue<CheckboxCardVariant[key]>
    | undefined
}

export interface CheckboxCardRecipe {
  __slot: CheckboxCardSlot
  __type: CheckboxCardVariantProps;
  (props?: CheckboxCardVariantProps): Pretty<Record<CheckboxCardSlot, string>>
  raw: (props?: CheckboxCardVariantProps) => CheckboxCardVariantProps
  variantMap: CheckboxCardVariantMap
  variantKeys: Array<keyof CheckboxCardVariant>
  splitVariantProps<Props extends CheckboxCardVariantProps>(
    props: Props,
  ): [
    CheckboxCardVariantProps,
    Pretty<DistributiveOmit<Props, keyof CheckboxCardVariantProps>>,
  ]
  getVariantProps: (
    props?: CheckboxCardVariantProps,
  ) => CheckboxCardVariantProps
}

export declare const checkboxCard: CheckboxCardRecipe
