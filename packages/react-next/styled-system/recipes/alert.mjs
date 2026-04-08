import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const alertDefaultVariants = {
  "status": "info",
  "variant": "subtle",
  "size": "md",
  "inline": false
}
const alertCompoundVariants = []

const alertSlotNames = [
  [
    "title",
    "alert__title"
  ],
  [
    "description",
    "alert__description"
  ],
  [
    "root",
    "alert__root"
  ],
  [
    "indicator",
    "alert__indicator"
  ],
  [
    "content",
    "alert__content"
  ]
]
const alertSlotFns = /* @__PURE__ */ alertSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, alertDefaultVariants, getSlotCompoundVariant(alertCompoundVariants, slotName))])

const alertFn = memo((props = {}) => {
  return Object.fromEntries(alertSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const alertVariantKeys = [
  "status",
  "inline",
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...alertDefaultVariants, ...compact(variants) })

export const alert = /* @__PURE__ */ Object.assign(alertFn, {
  __recipe__: false,
  __name__: 'alert',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: alertVariantKeys,
  variantMap: {
  "status": [
    "info",
    "warning",
    "success",
    "error",
    "neutral"
  ],
  "inline": [
    "true",
    "false"
  ],
  "variant": [
    "subtle",
    "surface",
    "outline",
    "solid"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, alertVariantKeys)
  },
  getVariantProps
})