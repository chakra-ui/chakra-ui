import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tabsDefaultVariants = {
  "size": "md",
  "variant": "line"
}
const tabsCompoundVariants = []

const tabsSlotNames = [
  [
    "root",
    "tabs__root"
  ],
  [
    "trigger",
    "tabs__trigger"
  ],
  [
    "list",
    "tabs__list"
  ],
  [
    "content",
    "tabs__content"
  ],
  [
    "contentGroup",
    "tabs__contentGroup"
  ],
  [
    "indicator",
    "tabs__indicator"
  ]
]
const tabsSlotFns = /* @__PURE__ */ tabsSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tabsDefaultVariants, getSlotCompoundVariant(tabsCompoundVariants, slotName))])

const tabsFn = memo((props = {}) => {
  return Object.fromEntries(tabsSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const tabsVariantKeys = [
  "fitted",
  "justify",
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...tabsDefaultVariants, ...compact(variants) })

export const tabs = /* @__PURE__ */ Object.assign(tabsFn, {
  __recipe__: false,
  __name__: 'tabs',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: tabsVariantKeys,
  variantMap: {
  "fitted": [
    "true"
  ],
  "justify": [
    "start",
    "center",
    "end"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "line",
    "subtle",
    "enclosed",
    "outline",
    "plain"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, tabsVariantKeys)
  },
  getVariantProps
})