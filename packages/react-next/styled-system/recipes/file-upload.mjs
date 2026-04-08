import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const fileUploadDefaultVariants = {}
const fileUploadCompoundVariants = []

const fileUploadSlotNames = [
  [
    "root",
    "file-upload__root"
  ],
  [
    "dropzone",
    "file-upload__dropzone"
  ],
  [
    "item",
    "file-upload__item"
  ],
  [
    "itemDeleteTrigger",
    "file-upload__itemDeleteTrigger"
  ],
  [
    "itemGroup",
    "file-upload__itemGroup"
  ],
  [
    "itemName",
    "file-upload__itemName"
  ],
  [
    "itemPreview",
    "file-upload__itemPreview"
  ],
  [
    "itemPreviewImage",
    "file-upload__itemPreviewImage"
  ],
  [
    "itemSizeText",
    "file-upload__itemSizeText"
  ],
  [
    "label",
    "file-upload__label"
  ],
  [
    "trigger",
    "file-upload__trigger"
  ],
  [
    "clearTrigger",
    "file-upload__clearTrigger"
  ],
  [
    "itemContent",
    "file-upload__itemContent"
  ],
  [
    "dropzoneContent",
    "file-upload__dropzoneContent"
  ],
  [
    "fileText",
    "file-upload__fileText"
  ]
]
const fileUploadSlotFns = /* @__PURE__ */ fileUploadSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, fileUploadDefaultVariants, getSlotCompoundVariant(fileUploadCompoundVariants, slotName))])

const fileUploadFn = memo((props = {}) => {
  return Object.fromEntries(fileUploadSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const fileUploadVariantKeys = []
const getVariantProps = (variants) => ({ ...fileUploadDefaultVariants, ...compact(variants) })

export const fileUpload = /* @__PURE__ */ Object.assign(fileUploadFn, {
  __recipe__: false,
  __name__: 'fileUpload',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: fileUploadVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, fileUploadVariantKeys)
  },
  getVariantProps
})