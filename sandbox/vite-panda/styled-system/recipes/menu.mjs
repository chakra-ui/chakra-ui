import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const menuDefaultVariants = {
  "size": "md",
  "variant": "subtle"
}
const menuCompoundVariants = []

const menuSlotNames = [
  [
    "arrow",
    "menu__arrow"
  ],
  [
    "arrowTip",
    "menu__arrowTip"
  ],
  [
    "content",
    "menu__content"
  ],
  [
    "contextTrigger",
    "menu__contextTrigger"
  ],
  [
    "indicator",
    "menu__indicator"
  ],
  [
    "item",
    "menu__item"
  ],
  [
    "itemGroup",
    "menu__itemGroup"
  ],
  [
    "itemGroupLabel",
    "menu__itemGroupLabel"
  ],
  [
    "itemIndicator",
    "menu__itemIndicator"
  ],
  [
    "itemText",
    "menu__itemText"
  ],
  [
    "positioner",
    "menu__positioner"
  ],
  [
    "separator",
    "menu__separator"
  ],
  [
    "trigger",
    "menu__trigger"
  ],
  [
    "triggerItem",
    "menu__triggerItem"
  ],
  [
    "itemCommand",
    "menu__itemCommand"
  ]
]
const menuSlotFns = /* @__PURE__ */ menuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, menuDefaultVariants, getSlotCompoundVariant(menuCompoundVariants, slotName))])

const menuFn = memo((props = {}) => {
  return Object.fromEntries(menuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const menuVariantKeys = [
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...menuDefaultVariants, ...compact(variants) })

export const menu = /* @__PURE__ */ Object.assign(menuFn, {
  __recipe__: false,
  __name__: 'menu',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: menuVariantKeys,
  variantMap: {
  "variant": [
    "subtle",
    "solid"
  ],
  "size": [
    "sm",
    "md"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, menuVariantKeys)
  },
  getVariantProps
})