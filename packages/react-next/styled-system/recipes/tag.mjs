import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tagDefaultVariants = {
  "size": "md",
  "variant": "surface"
}
const tagCompoundVariants = []

const tagSlotNames = [
  [
    "root",
    "tag__root"
  ],
  [
    "label",
    "tag__label"
  ],
  [
    "closeTrigger",
    "tag__closeTrigger"
  ],
  [
    "startElement",
    "tag__startElement"
  ],
  [
    "endElement",
    "tag__endElement"
  ]
]
const tagSlotFns = /* @__PURE__ */ tagSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tagDefaultVariants, getSlotCompoundVariant(tagCompoundVariants, slotName))])

const tagFn = memo((props = {}) => {
  return Object.fromEntries(tagSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const tagVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...tagDefaultVariants, ...compact(variants) })

export const tag = /* @__PURE__ */ Object.assign(tagFn, {
  __recipe__: false,
  __name__: 'tag',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: tagVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "variant": [
    "subtle",
    "solid",
    "outline",
    "surface"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, tagVariantKeys)
  },
  getVariantProps
})