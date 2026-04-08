/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface AlertVariant {
  /**
   * @default "info"
   */
  status: "info" | "warning" | "success" | "error" | "neutral"
  /**
   * @default false
   */
  inline: boolean
  /**
   * @default "subtle"
   */
  variant: "subtle" | "surface" | "outline" | "solid"
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
}

type AlertVariantMap = {
  [key in keyof AlertVariant]: Array<AlertVariant[key]>
}

type AlertSlot = "title" | "description" | "root" | "indicator" | "content"

export type AlertVariantProps = {
  [key in keyof AlertVariant]?: ConditionalValue<AlertVariant[key]> | undefined
}

export interface AlertRecipe {
  __slot: AlertSlot
  __type: AlertVariantProps;
  (props?: AlertVariantProps): Pretty<Record<AlertSlot, string>>
  raw: (props?: AlertVariantProps) => AlertVariantProps
  variantMap: AlertVariantMap
  variantKeys: Array<keyof AlertVariant>
  splitVariantProps<Props extends AlertVariantProps>(
    props: Props,
  ): [
    AlertVariantProps,
    Pretty<DistributiveOmit<Props, keyof AlertVariantProps>>,
  ]
  getVariantProps: (props?: AlertVariantProps) => AlertVariantProps
}

export declare const alert: AlertRecipe
