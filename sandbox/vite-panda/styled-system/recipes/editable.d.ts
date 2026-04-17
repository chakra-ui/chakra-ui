/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface EditableVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
}

type EditableVariantMap = {
  [key in keyof EditableVariant]: Array<EditableVariant[key]>
}

type EditableSlot =
  | "root"
  | "area"
  | "label"
  | "preview"
  | "input"
  | "editTrigger"
  | "submitTrigger"
  | "cancelTrigger"
  | "control"
  | "textarea"

export type EditableVariantProps = {
  [key in keyof EditableVariant]?:
    | ConditionalValue<EditableVariant[key]>
    | undefined
}

export interface EditableRecipe {
  __slot: EditableSlot
  __type: EditableVariantProps;
  (props?: EditableVariantProps): Pretty<Record<EditableSlot, string>>
  raw: (props?: EditableVariantProps) => EditableVariantProps
  variantMap: EditableVariantMap
  variantKeys: Array<keyof EditableVariant>
  splitVariantProps<Props extends EditableVariantProps>(
    props: Props,
  ): [
    EditableVariantProps,
    Pretty<DistributiveOmit<Props, keyof EditableVariantProps>>,
  ]
  getVariantProps: (props?: EditableVariantProps) => EditableVariantProps
}

export declare const editable: EditableRecipe
