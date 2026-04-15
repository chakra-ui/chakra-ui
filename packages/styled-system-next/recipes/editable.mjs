import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const editableDefaultVariants = {
  "size": "md"
}
const editableCompoundVariants = []

const editableSlotNames = [
  [
    "root",
    "editable__root"
  ],
  [
    "area",
    "editable__area"
  ],
  [
    "label",
    "editable__label"
  ],
  [
    "preview",
    "editable__preview"
  ],
  [
    "input",
    "editable__input"
  ],
  [
    "editTrigger",
    "editable__editTrigger"
  ],
  [
    "submitTrigger",
    "editable__submitTrigger"
  ],
  [
    "cancelTrigger",
    "editable__cancelTrigger"
  ],
  [
    "control",
    "editable__control"
  ],
  [
    "textarea",
    "editable__textarea"
  ]
]
const editableSlotFns = /* @__PURE__ */ editableSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, editableDefaultVariants, getSlotCompoundVariant(editableCompoundVariants, slotName))])

const editableFn = memo((props = {}) => {
  return Object.fromEntries(editableSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const editableVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...editableDefaultVariants, ...compact(variants) })

export const editable = /* @__PURE__ */ Object.assign(editableFn, {
  __recipe__: false,
  __name__: 'editable',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: editableVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, editableVariantKeys)
  },
  getVariantProps
})