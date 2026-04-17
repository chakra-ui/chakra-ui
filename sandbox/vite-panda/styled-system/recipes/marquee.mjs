import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const marqueeDefaultVariants = {}
const marqueeCompoundVariants = []

const marqueeSlotNames = [
  [
    "root",
    "marquee__root"
  ],
  [
    "viewport",
    "marquee__viewport"
  ],
  [
    "content",
    "marquee__content"
  ],
  [
    "edge",
    "marquee__edge"
  ],
  [
    "item",
    "marquee__item"
  ]
]
const marqueeSlotFns = /* @__PURE__ */ marqueeSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, marqueeDefaultVariants, getSlotCompoundVariant(marqueeCompoundVariants, slotName))])

const marqueeFn = memo((props = {}) => {
  return Object.fromEntries(marqueeSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const marqueeVariantKeys = []
const getVariantProps = (variants) => ({ ...marqueeDefaultVariants, ...compact(variants) })

export const marquee = /* @__PURE__ */ Object.assign(marqueeFn, {
  __recipe__: false,
  __name__: 'marquee',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: marqueeVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, marqueeVariantKeys)
  },
  getVariantProps
})