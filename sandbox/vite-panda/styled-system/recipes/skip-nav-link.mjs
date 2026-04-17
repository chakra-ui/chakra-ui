import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const skipNavLinkFn = /* @__PURE__ */ createRecipe('skip-nav', {}, [])

const skipNavLinkVariantMap = {}

const skipNavLinkVariantKeys = Object.keys(skipNavLinkVariantMap)

export const skipNavLink = /* @__PURE__ */ Object.assign(memo(skipNavLinkFn.recipeFn), {
  __recipe__: true,
  __name__: 'skipNavLink',
  __getCompoundVariantCss__: skipNavLinkFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: skipNavLinkVariantKeys,
  variantMap: skipNavLinkVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, skipNavLinkVariantKeys)
  },
  getVariantProps: skipNavLinkFn.getVariantProps,
})