import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const collapsibleDefaultVariants = {}
const collapsibleCompoundVariants = []

const collapsibleSlotNames = [
  [
    "root",
    "collapsible__root"
  ],
  [
    "trigger",
    "collapsible__trigger"
  ],
  [
    "content",
    "collapsible__content"
  ],
  [
    "indicator",
    "collapsible__indicator"
  ]
]
const collapsibleSlotFns = /* @__PURE__ */ collapsibleSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, collapsibleDefaultVariants, getSlotCompoundVariant(collapsibleCompoundVariants, slotName))])

const collapsibleFn = memo((props = {}) => {
  return Object.fromEntries(collapsibleSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const collapsibleVariantKeys = []
const getVariantProps = (variants) => ({ ...collapsibleDefaultVariants, ...compact(variants) })

export const collapsible = /* @__PURE__ */ Object.assign(collapsibleFn, {
  __recipe__: false,
  __name__: 'collapsible',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: collapsibleVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, collapsibleVariantKeys)
  },
  getVariantProps
})