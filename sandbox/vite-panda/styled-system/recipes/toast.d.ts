/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ToastVariant {}

type ToastVariantMap = {
  [key in keyof ToastVariant]: Array<ToastVariant[key]>
}

type ToastSlot =
  | "root"
  | "title"
  | "description"
  | "indicator"
  | "closeTrigger"
  | "actionTrigger"

export type ToastVariantProps = {
  [key in keyof ToastVariant]?: ConditionalValue<ToastVariant[key]> | undefined
}

export interface ToastRecipe {
  __slot: ToastSlot
  __type: ToastVariantProps;
  (props?: ToastVariantProps): Pretty<Record<ToastSlot, string>>
  raw: (props?: ToastVariantProps) => ToastVariantProps
  variantMap: ToastVariantMap
  variantKeys: Array<keyof ToastVariant>
  splitVariantProps<Props extends ToastVariantProps>(
    props: Props,
  ): [
    ToastVariantProps,
    Pretty<DistributiveOmit<Props, keyof ToastVariantProps>>,
  ]
  getVariantProps: (props?: ToastVariantProps) => ToastVariantProps
}

export declare const toast: ToastRecipe
