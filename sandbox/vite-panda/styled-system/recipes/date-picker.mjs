import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const datePickerDefaultVariants = {
  "size": "md",
  "variant": "outline"
}
const datePickerCompoundVariants = []

const datePickerSlotNames = [
  [
    "clearTrigger",
    "date-picker__clearTrigger"
  ],
  [
    "content",
    "date-picker__content"
  ],
  [
    "control",
    "date-picker__control"
  ],
  [
    "input",
    "date-picker__input"
  ],
  [
    "label",
    "date-picker__label"
  ],
  [
    "monthSelect",
    "date-picker__monthSelect"
  ],
  [
    "nextTrigger",
    "date-picker__nextTrigger"
  ],
  [
    "positioner",
    "date-picker__positioner"
  ],
  [
    "presetTrigger",
    "date-picker__presetTrigger"
  ],
  [
    "prevTrigger",
    "date-picker__prevTrigger"
  ],
  [
    "rangeText",
    "date-picker__rangeText"
  ],
  [
    "root",
    "date-picker__root"
  ],
  [
    "table",
    "date-picker__table"
  ],
  [
    "tableBody",
    "date-picker__tableBody"
  ],
  [
    "tableCell",
    "date-picker__tableCell"
  ],
  [
    "tableCellTrigger",
    "date-picker__tableCellTrigger"
  ],
  [
    "tableHead",
    "date-picker__tableHead"
  ],
  [
    "tableHeader",
    "date-picker__tableHeader"
  ],
  [
    "tableRow",
    "date-picker__tableRow"
  ],
  [
    "trigger",
    "date-picker__trigger"
  ],
  [
    "view",
    "date-picker__view"
  ],
  [
    "viewControl",
    "date-picker__viewControl"
  ],
  [
    "viewTrigger",
    "date-picker__viewTrigger"
  ],
  [
    "yearSelect",
    "date-picker__yearSelect"
  ],
  [
    "view",
    "date-picker__view"
  ],
  [
    "valueText",
    "date-picker__valueText"
  ],
  [
    "indicatorGroup",
    "date-picker__indicatorGroup"
  ]
]
const datePickerSlotFns = /* @__PURE__ */ datePickerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, datePickerDefaultVariants, getSlotCompoundVariant(datePickerCompoundVariants, slotName))])

const datePickerFn = memo((props = {}) => {
  return Object.fromEntries(datePickerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const datePickerVariantKeys = [
  "size",
  "hideOutsideDays",
  "variant"
]
const getVariantProps = (variants) => ({ ...datePickerDefaultVariants, ...compact(variants) })

export const datePicker = /* @__PURE__ */ Object.assign(datePickerFn, {
  __recipe__: false,
  __name__: 'datePicker',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: datePickerVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "hideOutsideDays": [
    "true"
  ],
  "variant": [
    "outline",
    "subtle",
    "flushed"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, datePickerVariantKeys)
  },
  getVariantProps
})