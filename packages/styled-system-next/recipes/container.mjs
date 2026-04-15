import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const containerFn = /* @__PURE__ */ createRecipe('container', {}, [])

const containerVariantMap = {
  "centerContent": [
    "true"
  ],
  "fluid": [
    "true"
  ]
}

const containerVariantKeys = Object.keys(containerVariantMap)

export const container = /* @__PURE__ */ Object.assign(memo(containerFn.recipeFn), {
  __recipe__: true,
  __name__: 'container',
  __getCompoundVariantCss__: containerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: containerVariantKeys,
  variantMap: containerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, containerVariantKeys)
  },
  getVariantProps: containerFn.getVariantProps,
})