import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const swittchDefaultVariants = {
  "variant": "solid",
  "size": "md"
}
const swittchCompoundVariants = []

const swittchSlotNames = [
  [
    "root",
    "switch__root"
  ],
  [
    "label",
    "switch__label"
  ],
  [
    "control",
    "switch__control"
  ],
  [
    "thumb",
    "switch__thumb"
  ],
  [
    "indicator",
    "switch__indicator"
  ]
]
const swittchSlotFns = /* @__PURE__ */ swittchSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, swittchDefaultVariants, getSlotCompoundVariant(swittchCompoundVariants, slotName))])

const swittchFn = memo((props = {}) => {
  return Object.fromEntries(swittchSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const swittchVariantKeys = [
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...swittchDefaultVariants, ...compact(variants) })

export const swittch = /* @__PURE__ */ Object.assign(swittchFn, {
  __recipe__: false,
  __name__: 'swittch',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: swittchVariantKeys,
  variantMap: {
  "variant": [
    "solid",
    "raised"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, swittchVariantKeys)
  },
  getVariantProps
})