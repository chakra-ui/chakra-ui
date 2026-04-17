import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const segmentGroupDefaultVariants = {
  "size": "md"
}
const segmentGroupCompoundVariants = []

const segmentGroupSlotNames = [
  [
    "root",
    "segment-group__root"
  ],
  [
    "label",
    "segment-group__label"
  ],
  [
    "item",
    "segment-group__item"
  ],
  [
    "itemText",
    "segment-group__itemText"
  ],
  [
    "itemControl",
    "segment-group__itemControl"
  ],
  [
    "indicator",
    "segment-group__indicator"
  ]
]
const segmentGroupSlotFns = /* @__PURE__ */ segmentGroupSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, segmentGroupDefaultVariants, getSlotCompoundVariant(segmentGroupCompoundVariants, slotName))])

const segmentGroupFn = memo((props = {}) => {
  return Object.fromEntries(segmentGroupSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const segmentGroupVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...segmentGroupDefaultVariants, ...compact(variants) })

export const segmentGroup = /* @__PURE__ */ Object.assign(segmentGroupFn, {
  __recipe__: false,
  __name__: 'segmentGroup',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: segmentGroupVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, segmentGroupVariantKeys)
  },
  getVariantProps
})