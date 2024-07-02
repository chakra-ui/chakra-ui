import type { SystemContext } from "@chakra-ui/react"

function toLiteralStringType(strings: string[]) {
  return (
    strings
      .map((s) => `"${s}"`)
      .join(" | ")
      .trim() || "string"
  )
}

interface PropDoc {
  type: string
  defaultValue?: string
  isRequired: boolean
  description: string
}

type PropDocRecord = Record<string, PropDoc>

const ignoreList = ["transparent", "current", "border", "bg", "fg"]

function getColorPaletteType(system: SystemContext) {
  const palettes = system.tokens.colorPaletteMap
  ignoreList.forEach((key) => palettes.delete(key))
  return toLiteralStringType(Array.from(system.tokens.colorPaletteMap.keys()))
}

export function getRecipeProps(system: SystemContext, key: string) {
  const result: PropDocRecord = {}

  const colorPaletteType = getColorPaletteType(system)

  const _recipe = system.getRecipe(key)
  let config = _recipe || system.getSlotRecipe(key)

  const recipe = _recipe ? system.cva(config) : system.sva(config)

  result["colorPalette"] = {
    defaultValue: "gray",
    type: colorPaletteType,
    isRequired: false,
    description: "The color palette of the component",
  }

  Object.keys(recipe.variantMap).forEach((variant) => {
    const values = recipe.variantMap[variant] as string[]
    result[variant] = {
      type: toLiteralStringType(values),
      defaultValue: config.defaultVariants[variant],
      isRequired: false,
      description: `The ${variant} of the component`,
    }
  })

  return result
}
