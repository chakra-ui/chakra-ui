/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface TableVariant {
  interactive: boolean
  stickyHeader: boolean
  striped: boolean
  showColumnBorder: boolean
  /**
   * @default "line"
   */
  variant: "line" | "outline"
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
}

type TableVariantMap = {
  [key in keyof TableVariant]: Array<TableVariant[key]>
}

type TableSlot =
  | "root"
  | "header"
  | "body"
  | "row"
  | "columnHeader"
  | "cell"
  | "footer"
  | "caption"

export type TableVariantProps = {
  [key in keyof TableVariant]?: ConditionalValue<TableVariant[key]> | undefined
}

export interface TableRecipe {
  __slot: TableSlot
  __type: TableVariantProps;
  (props?: TableVariantProps): Pretty<Record<TableSlot, string>>
  raw: (props?: TableVariantProps) => TableVariantProps
  variantMap: TableVariantMap
  variantKeys: Array<keyof TableVariant>
  splitVariantProps<Props extends TableVariantProps>(
    props: Props,
  ): [
    TableVariantProps,
    Pretty<DistributiveOmit<Props, keyof TableVariantProps>>,
  ]
  getVariantProps: (props?: TableVariantProps) => TableVariantProps
}

export declare const table: TableRecipe
