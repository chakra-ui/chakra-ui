import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tagsInputDefaultVariants = {
  "size": "md",
  "variant": "outline"
}
const tagsInputCompoundVariants = []

const tagsInputSlotNames = [
  [
    "root",
    "tags-input__root"
  ],
  [
    "label",
    "tags-input__label"
  ],
  [
    "control",
    "tags-input__control"
  ],
  [
    "input",
    "tags-input__input"
  ],
  [
    "clearTrigger",
    "tags-input__clearTrigger"
  ],
  [
    "item",
    "tags-input__item"
  ],
  [
    "itemPreview",
    "tags-input__itemPreview"
  ],
  [
    "itemInput",
    "tags-input__itemInput"
  ],
  [
    "itemText",
    "tags-input__itemText"
  ],
  [
    "itemDeleteTrigger",
    "tags-input__itemDeleteTrigger"
  ]
]
const tagsInputSlotFns = /* @__PURE__ */ tagsInputSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tagsInputDefaultVariants, getSlotCompoundVariant(tagsInputCompoundVariants, slotName))])

const tagsInputFn = memo((props = {}) => {
  return Object.fromEntries(tagsInputSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const tagsInputVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...tagsInputDefaultVariants, ...compact(variants) })

export const tagsInput = /* @__PURE__ */ Object.assign(tagsInputFn, {
  __recipe__: false,
  __name__: 'tagsInput',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: tagsInputVariantKeys,
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
    return splitProps(props, tagsInputVariantKeys)
  },
  getVariantProps
})