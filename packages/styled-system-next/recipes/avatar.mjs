import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const avatarDefaultVariants = {
  "size": "md",
  "shape": "full",
  "variant": "subtle"
}
const avatarCompoundVariants = []

const avatarSlotNames = [
  [
    "root",
    "avatar__root"
  ],
  [
    "image",
    "avatar__image"
  ],
  [
    "fallback",
    "avatar__fallback"
  ]
]
const avatarSlotFns = /* @__PURE__ */ avatarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, avatarDefaultVariants, getSlotCompoundVariant(avatarCompoundVariants, slotName))])

const avatarFn = memo((props = {}) => {
  return Object.fromEntries(avatarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const avatarVariantKeys = [
  "size",
  "variant",
  "shape",
  "borderless"
]
const getVariantProps = (variants) => ({ ...avatarDefaultVariants, ...compact(variants) })

export const avatar = /* @__PURE__ */ Object.assign(avatarFn, {
  __recipe__: false,
  __name__: 'avatar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: avatarVariantKeys,
  variantMap: {
  "size": [
    "full",
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ],
  "variant": [
    "solid",
    "subtle",
    "outline"
  ],
  "shape": [
    "square",
    "rounded",
    "full"
  ],
  "borderless": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, avatarVariantKeys)
  },
  getVariantProps
})