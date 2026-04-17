import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const statDefaultVariants = {
  "size": "md"
}
const statCompoundVariants = []

const statSlotNames = [
  [
    "root",
    "stat__root"
  ],
  [
    "label",
    "stat__label"
  ],
  [
    "helpText",
    "stat__helpText"
  ],
  [
    "valueText",
    "stat__valueText"
  ],
  [
    "valueUnit",
    "stat__valueUnit"
  ],
  [
    "indicator",
    "stat__indicator"
  ]
]
const statSlotFns = /* @__PURE__ */ statSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, statDefaultVariants, getSlotCompoundVariant(statCompoundVariants, slotName))])

const statFn = memo((props = {}) => {
  return Object.fromEntries(statSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const statVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...statDefaultVariants, ...compact(variants) })

export const stat = /* @__PURE__ */ Object.assign(statFn, {
  __recipe__: false,
  __name__: 'stat',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: statVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, statVariantKeys)
  },
  getVariantProps
})