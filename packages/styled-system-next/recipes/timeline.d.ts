/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface TimelineVariant {
  /**
   * @default "solid"
   */
  variant: "subtle" | "solid" | "outline" | "plain"
  /**
   * @default false
   */
  showLastSeparator: boolean
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg" | "xl"
}

type TimelineVariantMap = {
  [key in keyof TimelineVariant]: Array<TimelineVariant[key]>
}

type TimelineSlot =
  | "root"
  | "item"
  | "content"
  | "separator"
  | "indicator"
  | "connector"
  | "title"
  | "description"

export type TimelineVariantProps = {
  [key in keyof TimelineVariant]?:
    | ConditionalValue<TimelineVariant[key]>
    | undefined
}

export interface TimelineRecipe {
  __slot: TimelineSlot
  __type: TimelineVariantProps;
  (props?: TimelineVariantProps): Pretty<Record<TimelineSlot, string>>
  raw: (props?: TimelineVariantProps) => TimelineVariantProps
  variantMap: TimelineVariantMap
  variantKeys: Array<keyof TimelineVariant>
  splitVariantProps<Props extends TimelineVariantProps>(
    props: Props,
  ): [
    TimelineVariantProps,
    Pretty<DistributiveOmit<Props, keyof TimelineVariantProps>>,
  ]
  getVariantProps: (props?: TimelineVariantProps) => TimelineVariantProps
}

export declare const timeline: TimelineRecipe
