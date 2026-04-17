import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dialogDefaultVariants = {
  "size": "md",
  "scrollBehavior": "outside",
  "placement": "top",
  "motionPreset": "scale"
}
const dialogCompoundVariants = []

const dialogSlotNames = [
  [
    "trigger",
    "dialog__trigger"
  ],
  [
    "backdrop",
    "dialog__backdrop"
  ],
  [
    "positioner",
    "dialog__positioner"
  ],
  [
    "content",
    "dialog__content"
  ],
  [
    "title",
    "dialog__title"
  ],
  [
    "description",
    "dialog__description"
  ],
  [
    "closeTrigger",
    "dialog__closeTrigger"
  ],
  [
    "header",
    "dialog__header"
  ],
  [
    "body",
    "dialog__body"
  ],
  [
    "footer",
    "dialog__footer"
  ],
  [
    "backdrop",
    "dialog__backdrop"
  ]
]
const dialogSlotFns = /* @__PURE__ */ dialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dialogDefaultVariants, getSlotCompoundVariant(dialogCompoundVariants, slotName))])

const dialogFn = memo((props = {}) => {
  return Object.fromEntries(dialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dialogVariantKeys = [
  "placement",
  "scrollBehavior",
  "size",
  "motionPreset"
]
const getVariantProps = (variants) => ({ ...dialogDefaultVariants, ...compact(variants) })

export const dialog = /* @__PURE__ */ Object.assign(dialogFn, {
  __recipe__: false,
  __name__: 'dialog',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: dialogVariantKeys,
  variantMap: {
  "placement": [
    "center",
    "top",
    "bottom"
  ],
  "scrollBehavior": [
    "inside",
    "outside"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "cover",
    "full"
  ],
  "motionPreset": [
    "scale",
    "slide-in-bottom",
    "slide-in-top",
    "slide-in-left",
    "slide-in-right",
    "none"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, dialogVariantKeys)
  },
  getVariantProps
})