/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ActionBarVariant {
  /**
   * @default "bottom"
   */
  placement: "bottom" | "bottom-start" | "bottom-end"
}

type ActionBarVariantMap = {
  [key in keyof ActionBarVariant]: Array<ActionBarVariant[key]>
}

type ActionBarSlot =
  | "positioner"
  | "content"
  | "separator"
  | "selectionTrigger"
  | "closeTrigger"

export type ActionBarVariantProps = {
  [key in keyof ActionBarVariant]?:
    | ConditionalValue<ActionBarVariant[key]>
    | undefined
}

export interface ActionBarRecipe {
  __slot: ActionBarSlot
  __type: ActionBarVariantProps;
  (props?: ActionBarVariantProps): Pretty<Record<ActionBarSlot, string>>
  raw: (props?: ActionBarVariantProps) => ActionBarVariantProps
  variantMap: ActionBarVariantMap
  variantKeys: Array<keyof ActionBarVariant>
  splitVariantProps<Props extends ActionBarVariantProps>(
    props: Props,
  ): [
    ActionBarVariantProps,
    Pretty<DistributiveOmit<Props, keyof ActionBarVariantProps>>,
  ]
  getVariantProps: (props?: ActionBarVariantProps) => ActionBarVariantProps
}

export declare const actionBar: ActionBarRecipe
