import { type Dict, mapEntries, omit, splitProps } from "../utils"
import type { RecipeCreatorFn, SlotRecipeCreatorFn } from "./recipe.types"
import { EMPTY_ARRAY, EMPTY_OBJECT, createEmptyObject } from "./singleton"

interface Options {
  cva: RecipeCreatorFn
}

const getSlotRecipes = (
  config: Record<string, any> = EMPTY_OBJECT,
): Record<string, any> => {
  const init = (slot: string) => ({
    base: config.base?.[slot] ?? EMPTY_OBJECT,
    variants: createEmptyObject(),
    defaultVariants: config.defaultVariants ?? EMPTY_OBJECT,
    compoundVariants: config.compoundVariants
      ? getSlotCompoundVariant(config.compoundVariants, slot)
      : (EMPTY_ARRAY as any[]),
  })

  const slots = config.slots ?? []
  const entries: [string, any] = slots.map((slot: any) => [slot, init(slot)])

  for (const [variantsKey, variantsSpec] of Object.entries(
    config.variants ?? {},
  )) {
    for (const [variantKey, variantSpec] of Object.entries(
      variantsSpec as Record<string, any>,
    )) {
      entries.forEach(([slot, slotRecipe]) => {
        slotRecipe.variants[variantsKey] ??= {}
        slotRecipe.variants[variantsKey][variantKey] =
          variantSpec[slot] ?? EMPTY_OBJECT
      })
    }
  }

  return Object.fromEntries(entries)
}

export const getSlotCompoundVariant = <T extends { css: any }>(
  compoundVariants: T[],
  slotName: string,
) =>
  compoundVariants
    .filter((compoundVariant) => compoundVariant.css[slotName])
    .map((compoundVariant) => ({
      ...compoundVariant,
      css: compoundVariant.css[slotName],
    }))

export function createSlotRecipeFn(options: Options): SlotRecipeCreatorFn {
  const { cva } = options
  return function sva(config: Dict = EMPTY_OBJECT): any {
    const slots = Object.entries(getSlotRecipes(config)).map(
      ([slot, slotCva]) => [slot, cva(slotCva)],
    )

    function svaFn(props: Dict) {
      const result = slots.map(([slot, cvaFn]) => [slot, (cvaFn as any)(props)])
      return Object.fromEntries(result)
    }

    const variants = (config.variants ?? EMPTY_OBJECT) as Dict
    const variantKeys = Object.keys(variants)

    function splitVariantProps(props: Dict) {
      const restProps = omit(props, ["recipe"])
      const [recipeProps, localProps] = splitProps(restProps, variantKeys)

      const hasColorPalette = variantKeys.includes("colorPalette")
      const hasOrientation = variantKeys.includes("orientation")

      if (!hasColorPalette) {
        recipeProps.colorPalette =
          props.colorPalette || config.defaultVariants?.colorPalette
      }

      if (hasOrientation) {
        ;(localProps as any).orientation = props.orientation
      }

      return [recipeProps, localProps]
    }

    const variantMap = mapEntries(variants, (key, value) => [
      key,
      Object.keys(value),
    ])

    let classNameMap: Record<string, string> = {}

    if (config.className) {
      classNameMap = Object.fromEntries(
        config.slots.map((slot: string) => [
          slot,
          `${config.className}__${slot}`,
        ]),
      )
    }

    return Object.assign(svaFn, {
      variantMap,
      variantKeys,
      splitVariantProps,
      classNameMap,
    })
  }
}
