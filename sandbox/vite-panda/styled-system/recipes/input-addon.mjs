import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const inputAddonFn = /* @__PURE__ */ createRecipe('input-addon', {
  "size": "md",
  "variant": "outline"
}, [])

const inputAddonVariantMap = {
  "size": [
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ],
  "variant": [
    "outline",
    "subtle",
    "flushed"
  ]
}

const inputAddonVariantKeys = Object.keys(inputAddonVariantMap)

export const inputAddon = /* @__PURE__ */ Object.assign(memo(inputAddonFn.recipeFn), {
  __recipe__: true,
  __name__: 'inputAddon',
  __getCompoundVariantCss__: inputAddonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: inputAddonVariantKeys,
  variantMap: inputAddonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, inputAddonVariantKeys)
  },
  getVariantProps: inputAddonFn.getVariantProps,
})