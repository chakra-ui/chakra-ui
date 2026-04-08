import { type SystemContext } from "../src"

function toLiteralStringType(strings: string[]) {
  return (
    strings
      .map((s) => `"${s}"`)
      .join(" | ")
      .trim() || "string"
  )
}

type PropertyInfo = Record<
  string,
  {
    type: string
    defaultValue?: string
    required: boolean
    description: string
  }
>

const toRemove = ["transparent", "current", "border", "bg", "fg"]

function extractColorScheme(system: SystemContext) {
  const palettes = system.tokens.colorPaletteMap
  toRemove.forEach((key) => palettes.delete(key))
  return toLiteralStringType([...system.tokens.colorPaletteMap.keys()])
}

export function extractRecipeProps(system: SystemContext) {
  const result: Record<string, PropertyInfo> = {}

  const colorSchemeType = extractColorScheme(system)

  const recipeKeys = Object.keys({
    ...(system._config.theme?.recipes ?? {}),
    ...(system._config.theme?.slotRecipes ?? {}),
  })

  for (const key of recipeKeys) {
    const _recipe = system.getRecipe(key)
    let config = _recipe || system.getSlotRecipe(key)

    const recipe = _recipe ? system.cva(config) : system.sva(config)
    const _key = _recipe ? key : `${key}Root`

    result[_key] ||= {
      colorPalette: {
        defaultValue: "gray",
        type: colorSchemeType,
        required: false,
        description: "The color palette of the component",
      },
    }

    Object.keys(recipe.variantMap).forEach((variant) => {
      const values = recipe.variantMap[variant] as string[]
      result[_key][variant] = {
        type: toLiteralStringType(values),
        defaultValue: config.defaultVariants[variant],
        required: false,
        description: `The ${variant} of the component`,
      }
    })
  }

  return result
}
