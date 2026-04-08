/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface SkeletonVariant {
  /**
   * @default true
   */
  loading: boolean
  /**
   * @default "pulse"
   */
  variant: "pulse" | "shine" | "none"
}

type SkeletonVariantMap = {
  [key in keyof SkeletonVariant]: Array<SkeletonVariant[key]>
}

export type SkeletonVariantProps = {
  [key in keyof SkeletonVariant]?:
    | ConditionalValue<SkeletonVariant[key]>
    | undefined
}

export interface SkeletonRecipe {
  __type: SkeletonVariantProps;
  (props?: SkeletonVariantProps): string
  raw: (props?: SkeletonVariantProps) => SkeletonVariantProps
  variantMap: SkeletonVariantMap
  variantKeys: Array<keyof SkeletonVariant>
  splitVariantProps<Props extends SkeletonVariantProps>(
    props: Props,
  ): [
    SkeletonVariantProps,
    Pretty<DistributiveOmit<Props, keyof SkeletonVariantProps>>,
  ]
  getVariantProps: (props?: SkeletonVariantProps) => SkeletonVariantProps
}

export declare const skeleton: SkeletonRecipe
