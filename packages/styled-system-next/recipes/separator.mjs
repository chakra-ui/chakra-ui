import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const separatorFn = /* @__PURE__ */ createRecipe('separator', {
  "size": "sm",
  "variant": "solid",
  "orientation": "horizontal"
}, [])

const separatorVariantMap = {
  "variant": [
    "solid",
    "dashed",
    "dotted"
  ],
  "orientation": [
    "vertical",
    "horizontal"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ]
}

const separatorVariantKeys = Object.keys(separatorVariantMap)

export const separator = /* @__PURE__ */ Object.assign(memo(separatorFn.recipeFn), {
  __recipe__: true,
  __name__: 'separator',
  __getCompoundVariantCss__: separatorFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: separatorVariantKeys,
  variantMap: separatorVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, separatorVariantKeys)
  },
  getVariantProps: separatorFn.getVariantProps,
})