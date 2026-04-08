/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface DialogVariant {
  /**
   * @default "top"
   */
  placement: "center" | "top" | "bottom"
  /**
   * @default "outside"
   */
  scrollBehavior: "inside" | "outside"
  /**
   * @default "md"
   */
  size: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"
  /**
   * @default "scale"
   */
  motionPreset:
    | "scale"
    | "slide-in-bottom"
    | "slide-in-top"
    | "slide-in-left"
    | "slide-in-right"
    | "none"
}

type DialogVariantMap = {
  [key in keyof DialogVariant]: Array<DialogVariant[key]>
}

type DialogSlot =
  | "trigger"
  | "backdrop"
  | "positioner"
  | "content"
  | "title"
  | "description"
  | "closeTrigger"
  | "header"
  | "body"
  | "footer"
  | "backdrop"

export type DialogVariantProps = {
  [key in keyof DialogVariant]?:
    | ConditionalValue<DialogVariant[key]>
    | undefined
}

export interface DialogRecipe {
  __slot: DialogSlot
  __type: DialogVariantProps;
  (props?: DialogVariantProps): Pretty<Record<DialogSlot, string>>
  raw: (props?: DialogVariantProps) => DialogVariantProps
  variantMap: DialogVariantMap
  variantKeys: Array<keyof DialogVariant>
  splitVariantProps<Props extends DialogVariantProps>(
    props: Props,
  ): [
    DialogVariantProps,
    Pretty<DistributiveOmit<Props, keyof DialogVariantProps>>,
  ]
  getVariantProps: (props?: DialogVariantProps) => DialogVariantProps
}

export declare const dialog: DialogRecipe
