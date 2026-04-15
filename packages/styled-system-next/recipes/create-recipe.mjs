import { finalizeConditions, sortConditions } from '../css/conditions.mjs';
import { css } from '../css/css.mjs';
import { assertCompoundVariant, getCompoundVariantCss } from '../css/cva.mjs';
import { cx } from '../css/cx.mjs';
import { compact, createCss, splitProps, uniq, withoutSpace } from '../helpers.mjs';

export const createRecipe = (name, defaultVariants, compoundVariants) => {
 const getVariantProps = (variants) => {
   return {
     [name]: '__ignore__',
     ...defaultVariants,
     ...compact(variants),
   };
 };

  const recipeFn = (variants, withCompoundVariants = true) => {
   const transform = (prop, value) => {
     assertCompoundVariant(name, compoundVariants, variants, prop)

      if (value === '__ignore__') {
        return { className: name }
      }

      value = withoutSpace(value)
      return { className: `${name}--${prop}_${value}` }
   }

   const recipeCss = createCss({
     
     conditions: {
       shift: sortConditions,
       finalize: finalizeConditions,
       breakpoints: { keys: ["base","sm","md","lg","xl","2xl"] }
     },
     utility: {
       
       toHash: (path, hashFn) => hashFn(path.join(":")),
       transform,
     }
   })

   const recipeStyles = getVariantProps(variants)

   if (withCompoundVariants) {
     const compoundVariantStyles = getCompoundVariantCss(compoundVariants, recipeStyles)
     return cx(recipeCss(recipeStyles), css(compoundVariantStyles))
   }

   return recipeCss(recipeStyles)
  }

   return {
     recipeFn,
     getVariantProps,
     __getCompoundVariantCss__: (variants) => {
       return getCompoundVariantCss(compoundVariants, getVariantProps(variants));
     },
   }
}

export const mergeRecipes = (recipeA, recipeB) => {
 if (recipeA && !recipeB) return recipeA
 if (!recipeA && recipeB) return recipeB

 const recipeFn = (...args) => cx(recipeA(...args), recipeB(...args))
 const variantKeys = uniq(recipeA.variantKeys, recipeB.variantKeys)
 const variantMap = variantKeys.reduce((acc, key) => {
   acc[key] = uniq(recipeA.variantMap[key], recipeB.variantMap[key])
   return acc
 }, {})

 return Object.assign(recipeFn, {
   __recipe__: true,
   __name__: `${recipeA.__name__} ${recipeB.__name__}`,
   raw: (props) => props,
   variantKeys,
   variantMap,
   splitVariantProps(props) {
     return splitProps(props, variantKeys)
   },
 })
 }
