import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const kbdFn = /* @__PURE__ */ createRecipe('kbd', {
  "size": "md",
  "variant": "raised"
}, [])

const kbdVariantMap = {
  "variant": [
    "raised",
    "outline",
    "subtle",
    "plain"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const kbdVariantKeys = Object.keys(kbdVariantMap)

export const kbd = /* @__PURE__ */ Object.assign(memo(kbdFn.recipeFn), {
  __recipe__: true,
  __name__: 'kbd',
  __getCompoundVariantCss__: kbdFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: kbdVariantKeys,
  variantMap: kbdVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, kbdVariantKeys)
  },
  getVariantProps: kbdFn.getVariantProps,
})