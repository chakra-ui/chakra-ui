import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const progressDefaultVariants = {
  "variant": "outline",
  "size": "md",
  "shape": "rounded"
}
const progressCompoundVariants = []

const progressSlotNames = [
  [
    "root",
    "progress__root"
  ],
  [
    "label",
    "progress__label"
  ],
  [
    "track",
    "progress__track"
  ],
  [
    "range",
    "progress__range"
  ],
  [
    "valueText",
    "progress__valueText"
  ],
  [
    "view",
    "progress__view"
  ],
  [
    "circle",
    "progress__circle"
  ],
  [
    "circleTrack",
    "progress__circleTrack"
  ],
  [
    "circleRange",
    "progress__circleRange"
  ]
]
const progressSlotFns = /* @__PURE__ */ progressSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, progressDefaultVariants, getSlotCompoundVariant(progressCompoundVariants, slotName))])

const progressFn = memo((props = {}) => {
  return Object.fromEntries(progressSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const progressVariantKeys = [
  "variant",
  "shape",
  "striped",
  "animated",
  "size"
]
const getVariantProps = (variants) => ({ ...progressDefaultVariants, ...compact(variants) })

export const progress = /* @__PURE__ */ Object.assign(progressFn, {
  __recipe__: false,
  __name__: 'progress',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: progressVariantKeys,
  variantMap: {
  "variant": [
    "outline",
    "subtle"
  ],
  "shape": [
    "square",
    "rounded",
    "full"
  ],
  "striped": [
    "true"
  ],
  "animated": [
    "true"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, progressVariantKeys)
  },
  getVariantProps
})