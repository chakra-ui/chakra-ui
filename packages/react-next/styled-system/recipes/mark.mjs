import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const markFn = /* @__PURE__ */ createRecipe('mark', {}, [])

const markVariantMap = {
  "variant": [
    "subtle",
    "solid",
    "text",
    "plain"
  ]
}

const markVariantKeys = Object.keys(markVariantMap)

export const mark = /* @__PURE__ */ Object.assign(memo(markFn.recipeFn), {
  __recipe__: true,
  __name__: 'mark',
  __getCompoundVariantCss__: markFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: markVariantKeys,
  variantMap: markVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, markVariantKeys)
  },
  getVariantProps: markFn.getVariantProps,
})