import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const stepsDefaultVariants = {
  "size": "md",
  "variant": "solid",
  "orientation": "horizontal"
}
const stepsCompoundVariants = []

const stepsSlotNames = [
  [
    "root",
    "steps__root"
  ],
  [
    "list",
    "steps__list"
  ],
  [
    "item",
    "steps__item"
  ],
  [
    "trigger",
    "steps__trigger"
  ],
  [
    "indicator",
    "steps__indicator"
  ],
  [
    "separator",
    "steps__separator"
  ],
  [
    "content",
    "steps__content"
  ],
  [
    "title",
    "steps__title"
  ],
  [
    "description",
    "steps__description"
  ],
  [
    "nextTrigger",
    "steps__nextTrigger"
  ],
  [
    "prevTrigger",
    "steps__prevTrigger"
  ],
  [
    "progress",
    "steps__progress"
  ]
]
const stepsSlotFns = /* @__PURE__ */ stepsSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, stepsDefaultVariants, getSlotCompoundVariant(stepsCompoundVariants, slotName))])

const stepsFn = memo((props = {}) => {
  return Object.fromEntries(stepsSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const stepsVariantKeys = [
  "orientation",
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...stepsDefaultVariants, ...compact(variants) })

export const steps = /* @__PURE__ */ Object.assign(stepsFn, {
  __recipe__: false,
  __name__: 'steps',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: stepsVariantKeys,
  variantMap: {
  "orientation": [
    "vertical",
    "horizontal"
  ],
  "variant": [
    "solid",
    "subtle"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, stepsVariantKeys)
  },
  getVariantProps
})