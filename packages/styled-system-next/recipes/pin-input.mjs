import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const pinInputDefaultVariants = {
  "size": "md",
  "variant": "outline"
}
const pinInputCompoundVariants = []

const pinInputSlotNames = [
  [
    "root",
    "pin-input__root"
  ],
  [
    "label",
    "pin-input__label"
  ],
  [
    "input",
    "pin-input__input"
  ],
  [
    "control",
    "pin-input__control"
  ]
]
const pinInputSlotFns = /* @__PURE__ */ pinInputSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, pinInputDefaultVariants, getSlotCompoundVariant(pinInputCompoundVariants, slotName))])

const pinInputFn = memo((props = {}) => {
  return Object.fromEntries(pinInputSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const pinInputVariantKeys = [
  "size",
  "variant",
  "attached"
]
const getVariantProps = (variants) => ({ ...pinInputDefaultVariants, ...compact(variants) })

export const pinInput = /* @__PURE__ */ Object.assign(pinInputFn, {
  __recipe__: false,
  __name__: 'pinInput',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: pinInputVariantKeys,
  variantMap: {
  "size": [
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ],
  "variant": [
    "outline",
    "subtle",
    "flushed"
  ],
  "attached": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, pinInputVariantKeys)
  },
  getVariantProps
})