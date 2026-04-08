import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const numberInputDefaultVariants = {
  "size": "md",
  "variant": "outline"
}
const numberInputCompoundVariants = []

const numberInputSlotNames = [
  [
    "root",
    "number-input__root"
  ],
  [
    "label",
    "number-input__label"
  ],
  [
    "input",
    "number-input__input"
  ],
  [
    "control",
    "number-input__control"
  ],
  [
    "valueText",
    "number-input__valueText"
  ],
  [
    "incrementTrigger",
    "number-input__incrementTrigger"
  ],
  [
    "decrementTrigger",
    "number-input__decrementTrigger"
  ],
  [
    "scrubber",
    "number-input__scrubber"
  ]
]
const numberInputSlotFns = /* @__PURE__ */ numberInputSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, numberInputDefaultVariants, getSlotCompoundVariant(numberInputCompoundVariants, slotName))])

const numberInputFn = memo((props = {}) => {
  return Object.fromEntries(numberInputSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const numberInputVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...numberInputDefaultVariants, ...compact(variants) })

export const numberInput = /* @__PURE__ */ Object.assign(numberInputFn, {
  __recipe__: false,
  __name__: 'numberInput',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: numberInputVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "outline",
    "subtle",
    "flushed"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, numberInputVariantKeys)
  },
  getVariantProps
})