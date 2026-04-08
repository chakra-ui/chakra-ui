import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const splitterDefaultVariants = {}
const splitterCompoundVariants = []

const splitterSlotNames = [
  [
    "root",
    "splitter__root"
  ],
  [
    "panel",
    "splitter__panel"
  ],
  [
    "resizeTrigger",
    "splitter__resizeTrigger"
  ],
  [
    "resizeTriggerIndicator",
    "splitter__resizeTriggerIndicator"
  ],
  [
    "resizeTriggerSeparator",
    "splitter__resizeTriggerSeparator"
  ],
  [
    "resizeTriggerIndicator",
    "splitter__resizeTriggerIndicator"
  ]
]
const splitterSlotFns = /* @__PURE__ */ splitterSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, splitterDefaultVariants, getSlotCompoundVariant(splitterCompoundVariants, slotName))])

const splitterFn = memo((props = {}) => {
  return Object.fromEntries(splitterSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const splitterVariantKeys = []
const getVariantProps = (variants) => ({ ...splitterDefaultVariants, ...compact(variants) })

export const splitter = /* @__PURE__ */ Object.assign(splitterFn, {
  __recipe__: false,
  __name__: 'splitter',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: splitterVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, splitterVariantKeys)
  },
  getVariantProps
})