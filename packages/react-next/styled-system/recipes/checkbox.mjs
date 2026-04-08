import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const checkboxDefaultVariants = {
  "variant": "solid",
  "size": "md"
}
const checkboxCompoundVariants = []

const checkboxSlotNames = [
  [
    "root",
    "checkbox__root"
  ],
  [
    "label",
    "checkbox__label"
  ],
  [
    "control",
    "checkbox__control"
  ],
  [
    "indicator",
    "checkbox__indicator"
  ],
  [
    "group",
    "checkbox__group"
  ]
]
const checkboxSlotFns = /* @__PURE__ */ checkboxSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, checkboxDefaultVariants, getSlotCompoundVariant(checkboxCompoundVariants, slotName))])

const checkboxFn = memo((props = {}) => {
  return Object.fromEntries(checkboxSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const checkboxVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...checkboxDefaultVariants, ...compact(variants) })

export const checkbox = /* @__PURE__ */ Object.assign(checkboxFn, {
  __recipe__: false,
  __name__: 'checkbox',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: checkboxVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "outline",
    "solid",
    "subtle"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, checkboxVariantKeys)
  },
  getVariantProps
})