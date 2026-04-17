import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const skeletonFn = /* @__PURE__ */ createRecipe('skeleton', {
  "variant": "pulse",
  "loading": true
}, [])

const skeletonVariantMap = {
  "loading": [
    "true",
    "false"
  ],
  "variant": [
    "pulse",
    "shine",
    "none"
  ]
}

const skeletonVariantKeys = Object.keys(skeletonVariantMap)

export const skeleton = /* @__PURE__ */ Object.assign(memo(skeletonFn.recipeFn), {
  __recipe__: true,
  __name__: 'skeleton',
  __getCompoundVariantCss__: skeletonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: skeletonVariantKeys,
  variantMap: skeletonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, skeletonVariantKeys)
  },
  getVariantProps: skeletonFn.getVariantProps,
})