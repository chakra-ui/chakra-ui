import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dataListDefaultVariants = {
  "size": "md",
  "orientation": "vertical",
  "variant": "subtle"
}
const dataListCompoundVariants = []

const dataListSlotNames = [
  [
    "root",
    "data-list__root"
  ],
  [
    "item",
    "data-list__item"
  ],
  [
    "itemLabel",
    "data-list__itemLabel"
  ],
  [
    "itemValue",
    "data-list__itemValue"
  ]
]
const dataListSlotFns = /* @__PURE__ */ dataListSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dataListDefaultVariants, getSlotCompoundVariant(dataListCompoundVariants, slotName))])

const dataListFn = memo((props = {}) => {
  return Object.fromEntries(dataListSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dataListVariantKeys = [
  "orientation",
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...dataListDefaultVariants, ...compact(variants) })

export const dataList = /* @__PURE__ */ Object.assign(dataListFn, {
  __recipe__: false,
  __name__: 'dataList',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: dataListVariantKeys,
  variantMap: {
  "orientation": [
    "horizontal",
    "vertical"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "subtle",
    "bold"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, dataListVariantKeys)
  },
  getVariantProps
})