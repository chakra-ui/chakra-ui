import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const blockquoteDefaultVariants = {
  "variant": "subtle",
  "justify": "start"
}
const blockquoteCompoundVariants = []

const blockquoteSlotNames = [
  [
    "root",
    "blockquote__root"
  ],
  [
    "icon",
    "blockquote__icon"
  ],
  [
    "content",
    "blockquote__content"
  ],
  [
    "caption",
    "blockquote__caption"
  ]
]
const blockquoteSlotFns = /* @__PURE__ */ blockquoteSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, blockquoteDefaultVariants, getSlotCompoundVariant(blockquoteCompoundVariants, slotName))])

const blockquoteFn = memo((props = {}) => {
  return Object.fromEntries(blockquoteSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const blockquoteVariantKeys = [
  "justify",
  "variant"
]
const getVariantProps = (variants) => ({ ...blockquoteDefaultVariants, ...compact(variants) })

export const blockquote = /* @__PURE__ */ Object.assign(blockquoteFn, {
  __recipe__: false,
  __name__: 'blockquote',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: blockquoteVariantKeys,
  variantMap: {
  "justify": [
    "start",
    "center",
    "end"
  ],
  "variant": [
    "subtle",
    "solid",
    "plain"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, blockquoteVariantKeys)
  },
  getVariantProps
})