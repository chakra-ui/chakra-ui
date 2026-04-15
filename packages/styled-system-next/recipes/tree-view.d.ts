/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface TreeViewVariant {
  /**
   * @default "md"
   */
  size: "md" | "sm" | "xs"
  /**
   * @default "subtle"
   */
  variant: "subtle" | "solid"
  animateContent: boolean
}

type TreeViewVariantMap = {
  [key in keyof TreeViewVariant]: Array<TreeViewVariant[key]>
}

type TreeViewSlot =
  | "branch"
  | "branchContent"
  | "branchControl"
  | "branchIndentGuide"
  | "branchIndicator"
  | "branchText"
  | "branchTrigger"
  | "item"
  | "itemIndicator"
  | "itemText"
  | "label"
  | "nodeCheckbox"
  | "nodeRenameInput"
  | "root"
  | "tree"

export type TreeViewVariantProps = {
  [key in keyof TreeViewVariant]?:
    | ConditionalValue<TreeViewVariant[key]>
    | undefined
}

export interface TreeViewRecipe {
  __slot: TreeViewSlot
  __type: TreeViewVariantProps;
  (props?: TreeViewVariantProps): Pretty<Record<TreeViewSlot, string>>
  raw: (props?: TreeViewVariantProps) => TreeViewVariantProps
  variantMap: TreeViewVariantMap
  variantKeys: Array<keyof TreeViewVariant>
  splitVariantProps<Props extends TreeViewVariantProps>(
    props: Props,
  ): [
    TreeViewVariantProps,
    Pretty<DistributiveOmit<Props, keyof TreeViewVariantProps>>,
  ]
  getVariantProps: (props?: TreeViewVariantProps) => TreeViewVariantProps
}

export declare const treeView: TreeViewRecipe
