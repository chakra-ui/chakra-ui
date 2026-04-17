/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface BreadcrumbVariant {
  /**
   * @default "plain"
   */
  variant: "underline" | "plain"
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
}

type BreadcrumbVariantMap = {
  [key in keyof BreadcrumbVariant]: Array<BreadcrumbVariant[key]>
}

type BreadcrumbSlot =
  | "link"
  | "currentLink"
  | "item"
  | "list"
  | "root"
  | "ellipsis"
  | "separator"

export type BreadcrumbVariantProps = {
  [key in keyof BreadcrumbVariant]?:
    | ConditionalValue<BreadcrumbVariant[key]>
    | undefined
}

export interface BreadcrumbRecipe {
  __slot: BreadcrumbSlot
  __type: BreadcrumbVariantProps;
  (props?: BreadcrumbVariantProps): Pretty<Record<BreadcrumbSlot, string>>
  raw: (props?: BreadcrumbVariantProps) => BreadcrumbVariantProps
  variantMap: BreadcrumbVariantMap
  variantKeys: Array<keyof BreadcrumbVariant>
  splitVariantProps<Props extends BreadcrumbVariantProps>(
    props: Props,
  ): [
    BreadcrumbVariantProps,
    Pretty<DistributiveOmit<Props, keyof BreadcrumbVariantProps>>,
  ]
  getVariantProps: (props?: BreadcrumbVariantProps) => BreadcrumbVariantProps
}

export declare const breadcrumb: BreadcrumbRecipe
