import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const listboxDefaultVariants = {
  "variant": "subtle"
}
const listboxCompoundVariants = []

const listboxSlotNames = [
  [
    "label",
    "listbox__label"
  ],
  [
    "input",
    "listbox__input"
  ],
  [
    "item",
    "listbox__item"
  ],
  [
    "itemText",
    "listbox__itemText"
  ],
  [
    "itemIndicator",
    "listbox__itemIndicator"
  ],
  [
    "itemGroup",
    "listbox__itemGroup"
  ],
  [
    "itemGroupLabel",
    "listbox__itemGroupLabel"
  ],
  [
    "content",
    "listbox__content"
  ],
  [
    "root",
    "listbox__root"
  ],
  [
    "valueText",
    "listbox__valueText"
  ],
  [
    "empty",
    "listbox__empty"
  ]
]
const listboxSlotFns = /* @__PURE__ */ listboxSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, listboxDefaultVariants, getSlotCompoundVariant(listboxCompoundVariants, slotName))])

const listboxFn = memo((props = {}) => {
  return Object.fromEntries(listboxSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const listboxVariantKeys = [
  "variant"
]
const getVariantProps = (variants) => ({ ...listboxDefaultVariants, ...compact(variants) })

export const listbox = /* @__PURE__ */ Object.assign(listboxFn, {
  __recipe__: false,
  __name__: 'listbox',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: listboxVariantKeys,
  variantMap: {
  "variant": [
    "subtle",
    "solid",
    "plain"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, listboxVariantKeys)
  },
  getVariantProps
})