import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const timelineDefaultVariants = {
  "size": "md",
  "variant": "solid",
  "showLastSeparator": false
}
const timelineCompoundVariants = []

const timelineSlotNames = [
  [
    "root",
    "timeline__root"
  ],
  [
    "item",
    "timeline__item"
  ],
  [
    "content",
    "timeline__content"
  ],
  [
    "separator",
    "timeline__separator"
  ],
  [
    "indicator",
    "timeline__indicator"
  ],
  [
    "connector",
    "timeline__connector"
  ],
  [
    "title",
    "timeline__title"
  ],
  [
    "description",
    "timeline__description"
  ]
]
const timelineSlotFns = /* @__PURE__ */ timelineSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, timelineDefaultVariants, getSlotCompoundVariant(timelineCompoundVariants, slotName))])

const timelineFn = memo((props = {}) => {
  return Object.fromEntries(timelineSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const timelineVariantKeys = [
  "variant",
  "showLastSeparator",
  "size"
]
const getVariantProps = (variants) => ({ ...timelineDefaultVariants, ...compact(variants) })

export const timeline = /* @__PURE__ */ Object.assign(timelineFn, {
  __recipe__: false,
  __name__: 'timeline',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: timelineVariantKeys,
  variantMap: {
  "variant": [
    "subtle",
    "solid",
    "outline",
    "plain"
  ],
  "showLastSeparator": [
    "true",
    "false"
  ],
  "size": [
    "sm",
    "md",
    "lg",
    "xl"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, timelineVariantKeys)
  },
  getVariantProps
})