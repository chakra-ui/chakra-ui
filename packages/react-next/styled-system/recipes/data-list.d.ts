/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface DataListVariant {
  /**
   * @default "vertical"
   */
  orientation: "horizontal" | "vertical"
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
  /**
   * @default "subtle"
   */
  variant: "subtle" | "bold"
}

type DataListVariantMap = {
  [key in keyof DataListVariant]: Array<DataListVariant[key]>
}

type DataListSlot = "root" | "item" | "itemLabel" | "itemValue"

export type DataListVariantProps = {
  [key in keyof DataListVariant]?:
    | ConditionalValue<DataListVariant[key]>
    | undefined
}

export interface DataListRecipe {
  __slot: DataListSlot
  __type: DataListVariantProps;
  (props?: DataListVariantProps): Pretty<Record<DataListSlot, string>>
  raw: (props?: DataListVariantProps) => DataListVariantProps
  variantMap: DataListVariantMap
  variantKeys: Array<keyof DataListVariant>
  splitVariantProps<Props extends DataListVariantProps>(
    props: Props,
  ): [
    DataListVariantProps,
    Pretty<DistributiveOmit<Props, keyof DataListVariantProps>>,
  ]
  getVariantProps: (props?: DataListVariantProps) => DataListVariantProps
}

export declare const dataList: DataListRecipe
