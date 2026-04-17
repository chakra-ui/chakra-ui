/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface FieldsetVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
}

type FieldsetVariantMap = {
  [key in keyof FieldsetVariant]: Array<FieldsetVariant[key]>
}

type FieldsetSlot = "root" | "errorText" | "helperText" | "legend" | "content"

export type FieldsetVariantProps = {
  [key in keyof FieldsetVariant]?:
    | ConditionalValue<FieldsetVariant[key]>
    | undefined
}

export interface FieldsetRecipe {
  __slot: FieldsetSlot
  __type: FieldsetVariantProps;
  (props?: FieldsetVariantProps): Pretty<Record<FieldsetSlot, string>>
  raw: (props?: FieldsetVariantProps) => FieldsetVariantProps
  variantMap: FieldsetVariantMap
  variantKeys: Array<keyof FieldsetVariant>
  splitVariantProps<Props extends FieldsetVariantProps>(
    props: Props,
  ): [
    FieldsetVariantProps,
    Pretty<DistributiveOmit<Props, keyof FieldsetVariantProps>>,
  ]
  getVariantProps: (props?: FieldsetVariantProps) => FieldsetVariantProps
}

export declare const fieldset: FieldsetRecipe
