/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface SegmentGroupVariant {
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg"
}

type SegmentGroupVariantMap = {
  [key in keyof SegmentGroupVariant]: Array<SegmentGroupVariant[key]>
}

type SegmentGroupSlot =
  | "root"
  | "label"
  | "item"
  | "itemText"
  | "itemControl"
  | "indicator"

export type SegmentGroupVariantProps = {
  [key in keyof SegmentGroupVariant]?:
    | ConditionalValue<SegmentGroupVariant[key]>
    | undefined
}

export interface SegmentGroupRecipe {
  __slot: SegmentGroupSlot
  __type: SegmentGroupVariantProps;
  (props?: SegmentGroupVariantProps): Pretty<Record<SegmentGroupSlot, string>>
  raw: (props?: SegmentGroupVariantProps) => SegmentGroupVariantProps
  variantMap: SegmentGroupVariantMap
  variantKeys: Array<keyof SegmentGroupVariant>
  splitVariantProps<Props extends SegmentGroupVariantProps>(
    props: Props,
  ): [
    SegmentGroupVariantProps,
    Pretty<DistributiveOmit<Props, keyof SegmentGroupVariantProps>>,
  ]
  getVariantProps: (
    props?: SegmentGroupVariantProps,
  ) => SegmentGroupVariantProps
}

export declare const segmentGroup: SegmentGroupRecipe
