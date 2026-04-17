import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const codeBlockDefaultVariants = {
  "size": "md"
}
const codeBlockCompoundVariants = []

const codeBlockSlotNames = [
  [
    "root",
    "code-block__root"
  ],
  [
    "content",
    "code-block__content"
  ],
  [
    "title",
    "code-block__title"
  ],
  [
    "header",
    "code-block__header"
  ],
  [
    "footer",
    "code-block__footer"
  ],
  [
    "control",
    "code-block__control"
  ],
  [
    "overlay",
    "code-block__overlay"
  ],
  [
    "code",
    "code-block__code"
  ],
  [
    "codeText",
    "code-block__codeText"
  ],
  [
    "copyTrigger",
    "code-block__copyTrigger"
  ],
  [
    "copyIndicator",
    "code-block__copyIndicator"
  ],
  [
    "collapseTrigger",
    "code-block__collapseTrigger"
  ],
  [
    "collapseIndicator",
    "code-block__collapseIndicator"
  ],
  [
    "collapseText",
    "code-block__collapseText"
  ]
]
const codeBlockSlotFns = /* @__PURE__ */ codeBlockSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, codeBlockDefaultVariants, getSlotCompoundVariant(codeBlockCompoundVariants, slotName))])

const codeBlockFn = memo((props = {}) => {
  return Object.fromEntries(codeBlockSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const codeBlockVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...codeBlockDefaultVariants, ...compact(variants) })

export const codeBlock = /* @__PURE__ */ Object.assign(codeBlockFn, {
  __recipe__: false,
  __name__: 'codeBlock',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: codeBlockVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, codeBlockVariantKeys)
  },
  getVariantProps
})