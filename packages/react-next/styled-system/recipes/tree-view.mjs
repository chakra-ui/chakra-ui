import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const treeViewDefaultVariants = {
  "size": "md",
  "variant": "subtle"
}
const treeViewCompoundVariants = []

const treeViewSlotNames = [
  [
    "branch",
    "tree-view__branch"
  ],
  [
    "branchContent",
    "tree-view__branchContent"
  ],
  [
    "branchControl",
    "tree-view__branchControl"
  ],
  [
    "branchIndentGuide",
    "tree-view__branchIndentGuide"
  ],
  [
    "branchIndicator",
    "tree-view__branchIndicator"
  ],
  [
    "branchText",
    "tree-view__branchText"
  ],
  [
    "branchTrigger",
    "tree-view__branchTrigger"
  ],
  [
    "item",
    "tree-view__item"
  ],
  [
    "itemIndicator",
    "tree-view__itemIndicator"
  ],
  [
    "itemText",
    "tree-view__itemText"
  ],
  [
    "label",
    "tree-view__label"
  ],
  [
    "nodeCheckbox",
    "tree-view__nodeCheckbox"
  ],
  [
    "nodeRenameInput",
    "tree-view__nodeRenameInput"
  ],
  [
    "root",
    "tree-view__root"
  ],
  [
    "tree",
    "tree-view__tree"
  ]
]
const treeViewSlotFns = /* @__PURE__ */ treeViewSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, treeViewDefaultVariants, getSlotCompoundVariant(treeViewCompoundVariants, slotName))])

const treeViewFn = memo((props = {}) => {
  return Object.fromEntries(treeViewSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const treeViewVariantKeys = [
  "size",
  "variant",
  "animateContent"
]
const getVariantProps = (variants) => ({ ...treeViewDefaultVariants, ...compact(variants) })

export const treeView = /* @__PURE__ */ Object.assign(treeViewFn, {
  __recipe__: false,
  __name__: 'treeView',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: treeViewVariantKeys,
  variantMap: {
  "size": [
    "md",
    "sm",
    "xs"
  ],
  "variant": [
    "subtle",
    "solid"
  ],
  "animateContent": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, treeViewVariantKeys)
  },
  getVariantProps
})