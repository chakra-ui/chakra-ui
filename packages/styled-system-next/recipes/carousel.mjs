import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const carouselDefaultVariants = {}
const carouselCompoundVariants = []

const carouselSlotNames = [
  [
    "root",
    "carousel__root"
  ],
  [
    "itemGroup",
    "carousel__itemGroup"
  ],
  [
    "item",
    "carousel__item"
  ],
  [
    "control",
    "carousel__control"
  ],
  [
    "nextTrigger",
    "carousel__nextTrigger"
  ],
  [
    "prevTrigger",
    "carousel__prevTrigger"
  ],
  [
    "indicatorGroup",
    "carousel__indicatorGroup"
  ],
  [
    "indicator",
    "carousel__indicator"
  ],
  [
    "autoplayTrigger",
    "carousel__autoplayTrigger"
  ],
  [
    "progressText",
    "carousel__progressText"
  ],
  [
    "progressText",
    "carousel__progressText"
  ],
  [
    "autoplayIndicator",
    "carousel__autoplayIndicator"
  ]
]
const carouselSlotFns = /* @__PURE__ */ carouselSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, carouselDefaultVariants, getSlotCompoundVariant(carouselCompoundVariants, slotName))])

const carouselFn = memo((props = {}) => {
  return Object.fromEntries(carouselSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const carouselVariantKeys = []
const getVariantProps = (variants) => ({ ...carouselDefaultVariants, ...compact(variants) })

export const carousel = /* @__PURE__ */ Object.assign(carouselFn, {
  __recipe__: false,
  __name__: 'carousel',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: carouselVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, carouselVariantKeys)
  },
  getVariantProps
})