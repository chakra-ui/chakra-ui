/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ProgressCircleVariant {
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg" | "xl"
}

type ProgressCircleVariantMap = {
  [key in keyof ProgressCircleVariant]: Array<ProgressCircleVariant[key]>
}

type ProgressCircleSlot =
  | "root"
  | "label"
  | "track"
  | "range"
  | "valueText"
  | "view"
  | "circle"
  | "circleTrack"
  | "circleRange"

export type ProgressCircleVariantProps = {
  [key in keyof ProgressCircleVariant]?:
    | ConditionalValue<ProgressCircleVariant[key]>
    | undefined
}

export interface ProgressCircleRecipe {
  __slot: ProgressCircleSlot
  __type: ProgressCircleVariantProps;
  (
    props?: ProgressCircleVariantProps,
  ): Pretty<Record<ProgressCircleSlot, string>>
  raw: (props?: ProgressCircleVariantProps) => ProgressCircleVariantProps
  variantMap: ProgressCircleVariantMap
  variantKeys: Array<keyof ProgressCircleVariant>
  splitVariantProps<Props extends ProgressCircleVariantProps>(
    props: Props,
  ): [
    ProgressCircleVariantProps,
    Pretty<DistributiveOmit<Props, keyof ProgressCircleVariantProps>>,
  ]
  getVariantProps: (
    props?: ProgressCircleVariantProps,
  ) => ProgressCircleVariantProps
}

export declare const progressCircle: ProgressCircleRecipe
