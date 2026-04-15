/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ListboxVariant {
  /**
   * @default "subtle"
   */
  variant: "subtle" | "solid" | "plain"
}

type ListboxVariantMap = {
  [key in keyof ListboxVariant]: Array<ListboxVariant[key]>
}

type ListboxSlot =
  | "label"
  | "input"
  | "item"
  | "itemText"
  | "itemIndicator"
  | "itemGroup"
  | "itemGroupLabel"
  | "content"
  | "root"
  | "valueText"
  | "empty"

export type ListboxVariantProps = {
  [key in keyof ListboxVariant]?:
    | ConditionalValue<ListboxVariant[key]>
    | undefined
}

export interface ListboxRecipe {
  __slot: ListboxSlot
  __type: ListboxVariantProps;
  (props?: ListboxVariantProps): Pretty<Record<ListboxSlot, string>>
  raw: (props?: ListboxVariantProps) => ListboxVariantProps
  variantMap: ListboxVariantMap
  variantKeys: Array<keyof ListboxVariant>
  splitVariantProps<Props extends ListboxVariantProps>(
    props: Props,
  ): [
    ListboxVariantProps,
    Pretty<DistributiveOmit<Props, keyof ListboxVariantProps>>,
  ]
  getVariantProps: (props?: ListboxVariantProps) => ListboxVariantProps
}

export declare const listbox: ListboxRecipe
