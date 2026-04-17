import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const colorPickerDefaultVariants = {
  "size": "md",
  "variant": "outline"
}
const colorPickerCompoundVariants = []

const colorPickerSlotNames = [
  [
    "root",
    "colorPicker__root"
  ],
  [
    "label",
    "colorPicker__label"
  ],
  [
    "control",
    "colorPicker__control"
  ],
  [
    "trigger",
    "colorPicker__trigger"
  ],
  [
    "positioner",
    "colorPicker__positioner"
  ],
  [
    "content",
    "colorPicker__content"
  ],
  [
    "area",
    "colorPicker__area"
  ],
  [
    "areaThumb",
    "colorPicker__areaThumb"
  ],
  [
    "valueText",
    "colorPicker__valueText"
  ],
  [
    "areaBackground",
    "colorPicker__areaBackground"
  ],
  [
    "channelSlider",
    "colorPicker__channelSlider"
  ],
  [
    "channelSliderLabel",
    "colorPicker__channelSliderLabel"
  ],
  [
    "channelSliderTrack",
    "colorPicker__channelSliderTrack"
  ],
  [
    "channelSliderThumb",
    "colorPicker__channelSliderThumb"
  ],
  [
    "channelSliderValueText",
    "colorPicker__channelSliderValueText"
  ],
  [
    "channelInput",
    "colorPicker__channelInput"
  ],
  [
    "transparencyGrid",
    "colorPicker__transparencyGrid"
  ],
  [
    "swatchGroup",
    "colorPicker__swatchGroup"
  ],
  [
    "swatchTrigger",
    "colorPicker__swatchTrigger"
  ],
  [
    "swatchIndicator",
    "colorPicker__swatchIndicator"
  ],
  [
    "swatch",
    "colorPicker__swatch"
  ],
  [
    "eyeDropperTrigger",
    "colorPicker__eyeDropperTrigger"
  ],
  [
    "formatTrigger",
    "colorPicker__formatTrigger"
  ],
  [
    "formatSelect",
    "colorPicker__formatSelect"
  ],
  [
    "view",
    "colorPicker__view"
  ],
  [
    "channelText",
    "colorPicker__channelText"
  ]
]
const colorPickerSlotFns = /* @__PURE__ */ colorPickerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, colorPickerDefaultVariants, getSlotCompoundVariant(colorPickerCompoundVariants, slotName))])

const colorPickerFn = memo((props = {}) => {
  return Object.fromEntries(colorPickerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const colorPickerVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...colorPickerDefaultVariants, ...compact(variants) })

export const colorPicker = /* @__PURE__ */ Object.assign(colorPickerFn, {
  __recipe__: false,
  __name__: 'colorPicker',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: colorPickerVariantKeys,
  variantMap: {
  "size": [
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ],
  "variant": [
    "outline",
    "subtle"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, colorPickerVariantKeys)
  },
  getVariantProps
})