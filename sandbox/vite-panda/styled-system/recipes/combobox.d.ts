/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ComboboxVariant {
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle" | "flushed"
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg"
}

type ComboboxVariantMap = {
  [key in keyof ComboboxVariant]: Array<ComboboxVariant[key]>
}

type ComboboxSlot =
  | "root"
  | "clearTrigger"
  | "content"
  | "control"
  | "input"
  | "item"
  | "itemGroup"
  | "itemGroupLabel"
  | "itemIndicator"
  | "itemText"
  | "label"
  | "list"
  | "positioner"
  | "trigger"
  | "empty"
  | "indicatorGroup"
  | "empty"

export type ComboboxVariantProps = {
  [key in keyof ComboboxVariant]?:
    | ConditionalValue<ComboboxVariant[key]>
    | undefined
}

export interface ComboboxRecipe {
  __slot: ComboboxSlot
  __type: ComboboxVariantProps;
  (props?: ComboboxVariantProps): Pretty<Record<ComboboxSlot, string>>
  raw: (props?: ComboboxVariantProps) => ComboboxVariantProps
  variantMap: ComboboxVariantMap
  variantKeys: Array<keyof ComboboxVariant>
  splitVariantProps<Props extends ComboboxVariantProps>(
    props: Props,
  ): [
    ComboboxVariantProps,
    Pretty<DistributiveOmit<Props, keyof ComboboxVariantProps>>,
  ]
  getVariantProps: (props?: ComboboxVariantProps) => ComboboxVariantProps
}

export declare const combobox: ComboboxRecipe
