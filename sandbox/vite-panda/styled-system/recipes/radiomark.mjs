import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const radiomarkFn = /* @__PURE__ */ createRecipe('radiomark', {
  "variant": "solid",
  "size": "md"
}, [])

const radiomarkVariantMap = {
  "variant": [
    "solid",
    "subtle",
    "outline",
    "inverted"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "filled": [
    "true"
  ]
}

const radiomarkVariantKeys = Object.keys(radiomarkVariantMap)

export const radiomark = /* @__PURE__ */ Object.assign(memo(radiomarkFn.recipeFn), {
  __recipe__: true,
  __name__: 'radiomark',
  __getCompoundVariantCss__: radiomarkFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: radiomarkVariantKeys,
  variantMap: radiomarkVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, radiomarkVariantKeys)
  },
  getVariantProps: radiomarkFn.getVariantProps,
})