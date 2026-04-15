import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const hoverCardDefaultVariants = {
  "size": "md"
}
const hoverCardCompoundVariants = []

const hoverCardSlotNames = [
  [
    "arrow",
    "hover-card__arrow"
  ],
  [
    "arrowTip",
    "hover-card__arrowTip"
  ],
  [
    "trigger",
    "hover-card__trigger"
  ],
  [
    "positioner",
    "hover-card__positioner"
  ],
  [
    "content",
    "hover-card__content"
  ]
]
const hoverCardSlotFns = /* @__PURE__ */ hoverCardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, hoverCardDefaultVariants, getSlotCompoundVariant(hoverCardCompoundVariants, slotName))])

const hoverCardFn = memo((props = {}) => {
  return Object.fromEntries(hoverCardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const hoverCardVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...hoverCardDefaultVariants, ...compact(variants) })

export const hoverCard = /* @__PURE__ */ Object.assign(hoverCardFn, {
  __recipe__: false,
  __name__: 'hoverCard',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: hoverCardVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, hoverCardVariantKeys)
  },
  getVariantProps
})