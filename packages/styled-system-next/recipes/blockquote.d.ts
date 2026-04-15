/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface BlockquoteVariant {
  /**
   * @default "start"
   */
  justify: "start" | "center" | "end"
  /**
   * @default "subtle"
   */
  variant: "subtle" | "solid" | "plain"
}

type BlockquoteVariantMap = {
  [key in keyof BlockquoteVariant]: Array<BlockquoteVariant[key]>
}

type BlockquoteSlot = "root" | "icon" | "content" | "caption"

export type BlockquoteVariantProps = {
  [key in keyof BlockquoteVariant]?:
    | ConditionalValue<BlockquoteVariant[key]>
    | undefined
}

export interface BlockquoteRecipe {
  __slot: BlockquoteSlot
  __type: BlockquoteVariantProps;
  (props?: BlockquoteVariantProps): Pretty<Record<BlockquoteSlot, string>>
  raw: (props?: BlockquoteVariantProps) => BlockquoteVariantProps
  variantMap: BlockquoteVariantMap
  variantKeys: Array<keyof BlockquoteVariant>
  splitVariantProps<Props extends BlockquoteVariantProps>(
    props: Props,
  ): [
    BlockquoteVariantProps,
    Pretty<DistributiveOmit<Props, keyof BlockquoteVariantProps>>,
  ]
  getVariantProps: (props?: BlockquoteVariantProps) => BlockquoteVariantProps
}

export declare const blockquote: BlockquoteRecipe
