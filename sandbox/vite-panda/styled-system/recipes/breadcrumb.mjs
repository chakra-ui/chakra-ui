import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const breadcrumbDefaultVariants = {
  "variant": "plain",
  "size": "md"
}
const breadcrumbCompoundVariants = []

const breadcrumbSlotNames = [
  [
    "link",
    "breadcrumb__link"
  ],
  [
    "currentLink",
    "breadcrumb__currentLink"
  ],
  [
    "item",
    "breadcrumb__item"
  ],
  [
    "list",
    "breadcrumb__list"
  ],
  [
    "root",
    "breadcrumb__root"
  ],
  [
    "ellipsis",
    "breadcrumb__ellipsis"
  ],
  [
    "separator",
    "breadcrumb__separator"
  ]
]
const breadcrumbSlotFns = /* @__PURE__ */ breadcrumbSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, breadcrumbDefaultVariants, getSlotCompoundVariant(breadcrumbCompoundVariants, slotName))])

const breadcrumbFn = memo((props = {}) => {
  return Object.fromEntries(breadcrumbSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const breadcrumbVariantKeys = [
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...breadcrumbDefaultVariants, ...compact(variants) })

export const breadcrumb = /* @__PURE__ */ Object.assign(breadcrumbFn, {
  __recipe__: false,
  __name__: 'breadcrumb',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: breadcrumbVariantKeys,
  variantMap: {
  "variant": [
    "underline",
    "plain"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, breadcrumbVariantKeys)
  },
  getVariantProps
})