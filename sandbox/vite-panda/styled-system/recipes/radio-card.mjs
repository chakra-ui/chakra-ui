import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const radioCardDefaultVariants = {
  "size": "md",
  "variant": "outline",
  "align": "start",
  "orientation": "horizontal"
}
const radioCardCompoundVariants = []

const radioCardSlotNames = [
  [
    "root",
    "radio-card__root"
  ],
  [
    "label",
    "radio-card__label"
  ],
  [
    "item",
    "radio-card__item"
  ],
  [
    "itemText",
    "radio-card__itemText"
  ],
  [
    "itemControl",
    "radio-card__itemControl"
  ],
  [
    "indicator",
    "radio-card__indicator"
  ],
  [
    "itemAddon",
    "radio-card__itemAddon"
  ],
  [
    "itemIndicator",
    "radio-card__itemIndicator"
  ],
  [
    "itemContent",
    "radio-card__itemContent"
  ],
  [
    "itemDescription",
    "radio-card__itemDescription"
  ]
]
const radioCardSlotFns = /* @__PURE__ */ radioCardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, radioCardDefaultVariants, getSlotCompoundVariant(radioCardCompoundVariants, slotName))])

const radioCardFn = memo((props = {}) => {
  return Object.fromEntries(radioCardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const radioCardVariantKeys = [
  "size",
  "variant",
  "justify",
  "align",
  "orientation"
]
const getVariantProps = (variants) => ({ ...radioCardDefaultVariants, ...compact(variants) })

export const radioCard = /* @__PURE__ */ Object.assign(radioCardFn, {
  __recipe__: false,
  __name__: 'radioCard',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: radioCardVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "surface",
    "subtle",
    "outline",
    "solid"
  ],
  "justify": [
    "start",
    "end",
    "center"
  ],
  "align": [
    "start",
    "end",
    "center"
  ],
  "orientation": [
    "vertical",
    "horizontal"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, radioCardVariantKeys)
  },
  getVariantProps
})