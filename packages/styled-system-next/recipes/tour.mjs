import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tourDefaultVariants = {}
const tourCompoundVariants = []

const tourSlotNames = [
  [
    "content",
    "tour__content"
  ],
  [
    "actionTrigger",
    "tour__actionTrigger"
  ],
  [
    "closeTrigger",
    "tour__closeTrigger"
  ],
  [
    "progressText",
    "tour__progressText"
  ],
  [
    "title",
    "tour__title"
  ],
  [
    "description",
    "tour__description"
  ],
  [
    "positioner",
    "tour__positioner"
  ],
  [
    "arrow",
    "tour__arrow"
  ],
  [
    "arrowTip",
    "tour__arrowTip"
  ],
  [
    "backdrop",
    "tour__backdrop"
  ],
  [
    "spotlight",
    "tour__spotlight"
  ],
  [
    "control",
    "tour__control"
  ]
]
const tourSlotFns = /* @__PURE__ */ tourSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tourDefaultVariants, getSlotCompoundVariant(tourCompoundVariants, slotName))])

const tourFn = memo((props = {}) => {
  return Object.fromEntries(tourSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const tourVariantKeys = []
const getVariantProps = (variants) => ({ ...tourDefaultVariants, ...compact(variants) })

export const tour = /* @__PURE__ */ Object.assign(tourFn, {
  __recipe__: false,
  __name__: 'tour',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: tourVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, tourVariantKeys)
  },
  getVariantProps
})