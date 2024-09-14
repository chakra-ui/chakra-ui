import { type Dict, omit, splitProps } from "../utils"
import type { RecipeCreatorFn, SlotRecipeCreatorFn } from "./recipe.types"

interface Options {
  cva: RecipeCreatorFn
}

const getSlotRecipes = (
  config: Record<string, any> = {},
): Record<string, any> => {
  const init = (slot: string) => ({
    base: config.base?.[slot] ?? {},
    variants: {},
    defaultVariants: config.defaultVariants ?? {},
    compoundVariants: config.compoundVariants
      ? getSlotCompoundVariant(config.compoundVariants, slot)
      : [],
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
        slotRecipe.variants[variantsKey][variantKey] = variantSpec[slot] ?? {}
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
  return function sva(config: Dict = {}): any {
    const slots = Object.entries(getSlotRecipes(config)).map(
      ([slot, slotCva]) => [slot, cva(slotCva)],
    )

    function svaFn(props: Dict) {
      //@ts-ignore
      const result = slots.map(([slot, cvaFn]) => [slot, cvaFn(props)])
      return Object.fromEntries(result)
    }

    const variants = (config.variants ?? {}) as Dict
    const variantKeys = Object.keys(variants)

    function splitVariantProps(props: Dict) {
      const restProps = omit(props, ["recipe"])
      const [recipeProps, localProps] = splitProps(restProps, variantKeys)

      if (!variantKeys.includes("colorPalette")) {
        recipeProps.colorPalette =
          props.colorPalette || config.defaultVariants?.colorPalette
      }

      if (variantKeys.includes("orientation")) {
        ;(localProps as any).orientation = props.orientation
      }

      return [recipeProps, localProps]
    }

    const variantMap = Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [key, Object.keys(value)]),
    )

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
