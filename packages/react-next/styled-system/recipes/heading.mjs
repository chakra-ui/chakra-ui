import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const headingFn = /* @__PURE__ */ createRecipe('heading', {
  "size": "xl"
}, [])

const headingVariantMap = {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl"
  ]
}

const headingVariantKeys = Object.keys(headingVariantMap)

export const heading = /* @__PURE__ */ Object.assign(memo(headingFn.recipeFn), {
  __recipe__: true,
  __name__: 'heading',
  __getCompoundVariantCss__: headingFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: headingVariantKeys,
  variantMap: headingVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, headingVariantKeys)
  },
  getVariantProps: headingFn.getVariantProps,
})