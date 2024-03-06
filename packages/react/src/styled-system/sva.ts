import { Dict, memo, splitProps } from "@chakra-ui/utils"
import { RecipeCreatorFn, SlotRecipeCreatorFn } from "./recipe.types"

interface Options {
  cva: RecipeCreatorFn
}

const getSlotRecipes = (v: Record<string, any> = {}): Record<string, any> => {
  const init = (slot: string) => ({
    base: v.base?.[slot] ?? {},
    variants: {},
    defaultVariants: v.defaultVariants ?? {},
    compoundVariants: v.compoundVariants
      ? getSlotCompoundVariant(v.compoundVariants, slot)
      : [],
  })

  const slots = v.slots ?? []
  const entries: [string, any] = slots.map((slot: any) => [slot, init(slot)])

  for (const [variantsKey, variantsSpec] of Object.entries(v.variants ?? {})) {
    for (const [variantKey, variantSpec] of Object.entries(
      variantsSpec as Record<string, any>,
    )) {
      entries.forEach(([slot, slotRecipe]) => {
        slotRecipe.variants ??= {}
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
  return function sva(config: any): any {
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
      return splitProps(props, variantKeys)
    }

    const variantMap = Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [key, Object.keys(value)]),
    )

    return Object.assign(memo(svaFn), {
      __cva__: false,
      variantMap,
      variantKeys,
      splitVariantProps,
    })
  }
}
