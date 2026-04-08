/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ProgressVariant {
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle"
  /**
   * @default "rounded"
   */
  shape: "square" | "rounded" | "full"
  striped: boolean
  animated: boolean
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg" | "xl"
}

type ProgressVariantMap = {
  [key in keyof ProgressVariant]: Array<ProgressVariant[key]>
}

type ProgressSlot =
  | "root"
  | "label"
  | "track"
  | "range"
  | "valueText"
  | "view"
  | "circle"
  | "circleTrack"
  | "circleRange"

export type ProgressVariantProps = {
  [key in keyof ProgressVariant]?:
    | ConditionalValue<ProgressVariant[key]>
    | undefined
}

export interface ProgressRecipe {
  __slot: ProgressSlot
  __type: ProgressVariantProps;
  (props?: ProgressVariantProps): Pretty<Record<ProgressSlot, string>>
  raw: (props?: ProgressVariantProps) => ProgressVariantProps
  variantMap: ProgressVariantMap
  variantKeys: Array<keyof ProgressVariant>
  splitVariantProps<Props extends ProgressVariantProps>(
    props: Props,
  ): [
    ProgressVariantProps,
    Pretty<DistributiveOmit<Props, keyof ProgressVariantProps>>,
  ]
  getVariantProps: (props?: ProgressVariantProps) => ProgressVariantProps
}

export declare const progress: ProgressRecipe
