/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface CodeBlockVariant {
  /**
   * @default "md"
   */
  size: "sm" | "md" | "lg"
}

type CodeBlockVariantMap = {
  [key in keyof CodeBlockVariant]: Array<CodeBlockVariant[key]>
}

type CodeBlockSlot =
  | "root"
  | "content"
  | "title"
  | "header"
  | "footer"
  | "control"
  | "overlay"
  | "code"
  | "codeText"
  | "copyTrigger"
  | "copyIndicator"
  | "collapseTrigger"
  | "collapseIndicator"
  | "collapseText"

export type CodeBlockVariantProps = {
  [key in keyof CodeBlockVariant]?:
    | ConditionalValue<CodeBlockVariant[key]>
    | undefined
}

export interface CodeBlockRecipe {
  __slot: CodeBlockSlot
  __type: CodeBlockVariantProps;
  (props?: CodeBlockVariantProps): Pretty<Record<CodeBlockSlot, string>>
  raw: (props?: CodeBlockVariantProps) => CodeBlockVariantProps
  variantMap: CodeBlockVariantMap
  variantKeys: Array<keyof CodeBlockVariant>
  splitVariantProps<Props extends CodeBlockVariantProps>(
    props: Props,
  ): [
    CodeBlockVariantProps,
    Pretty<DistributiveOmit<Props, keyof CodeBlockVariantProps>>,
  ]
  getVariantProps: (props?: CodeBlockVariantProps) => CodeBlockVariantProps
}

export declare const codeBlock: CodeBlockRecipe
