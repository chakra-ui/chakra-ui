import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const toastDefaultVariants = {}
const toastCompoundVariants = []

const toastSlotNames = [
  [
    "root",
    "toast__root"
  ],
  [
    "title",
    "toast__title"
  ],
  [
    "description",
    "toast__description"
  ],
  [
    "indicator",
    "toast__indicator"
  ],
  [
    "closeTrigger",
    "toast__closeTrigger"
  ],
  [
    "actionTrigger",
    "toast__actionTrigger"
  ]
]
const toastSlotFns = /* @__PURE__ */ toastSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, toastDefaultVariants, getSlotCompoundVariant(toastCompoundVariants, slotName))])

const toastFn = memo((props = {}) => {
  return Object.fromEntries(toastSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const toastVariantKeys = []
const getVariantProps = (variants) => ({ ...toastDefaultVariants, ...compact(variants) })

export const toast = /* @__PURE__ */ Object.assign(toastFn, {
  __recipe__: false,
  __name__: 'toast',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: toastVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, toastVariantKeys)
  },
  getVariantProps
})