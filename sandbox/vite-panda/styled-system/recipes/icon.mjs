import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const iconFn = /* @__PURE__ */ createRecipe('icon', {
  "size": "inherit"
}, [])

const iconVariantMap = {
  "size": [
    "inherit",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ]
}

const iconVariantKeys = Object.keys(iconVariantMap)

export const icon = /* @__PURE__ */ Object.assign(memo(iconFn.recipeFn), {
  __recipe__: true,
  __name__: 'icon',
  __getCompoundVariantCss__: iconFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: iconVariantKeys,
  variantMap: iconVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, iconVariantKeys)
  },
  getVariantProps: iconFn.getVariantProps,
})