import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const listDefaultVariants = {
  "variant": "marker"
}
const listCompoundVariants = []

const listSlotNames = [
  [
    "root",
    "list__root"
  ],
  [
    "item",
    "list__item"
  ],
  [
    "indicator",
    "list__indicator"
  ]
]
const listSlotFns = /* @__PURE__ */ listSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, listDefaultVariants, getSlotCompoundVariant(listCompoundVariants, slotName))])

const listFn = memo((props = {}) => {
  return Object.fromEntries(listSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const listVariantKeys = [
  "variant",
  "align"
]
const getVariantProps = (variants) => ({ ...listDefaultVariants, ...compact(variants) })

export const list = /* @__PURE__ */ Object.assign(listFn, {
  __recipe__: false,
  __name__: 'list',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: listVariantKeys,
  variantMap: {
  "variant": [
    "marker",
    "plain"
  ],
  "align": [
    "center",
    "start",
    "end"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, listVariantKeys)
  },
  getVariantProps
})