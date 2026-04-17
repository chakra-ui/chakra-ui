import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const colorSwatchFn = /* @__PURE__ */ createRecipe('color-swatch', {
  "size": "md",
  "shape": "rounded"
}, [])

const colorSwatchVariantMap = {
  "size": [
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "inherit",
    "full"
  ],
  "shape": [
    "square",
    "circle",
    "rounded"
  ]
}

const colorSwatchVariantKeys = Object.keys(colorSwatchVariantMap)

export const colorSwatch = /* @__PURE__ */ Object.assign(memo(colorSwatchFn.recipeFn), {
  __recipe__: true,
  __name__: 'colorSwatch',
  __getCompoundVariantCss__: colorSwatchFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: colorSwatchVariantKeys,
  variantMap: colorSwatchVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, colorSwatchVariantKeys)
  },
  getVariantProps: colorSwatchFn.getVariantProps,
})