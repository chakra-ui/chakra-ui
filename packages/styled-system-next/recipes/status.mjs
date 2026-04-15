import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const statusDefaultVariants = {
  "size": "md"
}
const statusCompoundVariants = []

const statusSlotNames = [
  [
    "root",
    "status__root"
  ],
  [
    "indicator",
    "status__indicator"
  ]
]
const statusSlotFns = /* @__PURE__ */ statusSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, statusDefaultVariants, getSlotCompoundVariant(statusCompoundVariants, slotName))])

const statusFn = memo((props = {}) => {
  return Object.fromEntries(statusSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const statusVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...statusDefaultVariants, ...compact(variants) })

export const status = /* @__PURE__ */ Object.assign(statusFn, {
  __recipe__: false,
  __name__: 'status',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: statusVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, statusVariantKeys)
  },
  getVariantProps
})