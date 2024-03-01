import type { SystemContext } from "@chakra-ui/react"
import { capitalize, isBooleanValue, pretty, unionType } from "./shared.js"

export async function generateRecipe(sys: SystemContext) {
  const theme = sys._config.theme ?? {}

  const sysRecipes = theme.recipes ?? {}
  const sysSlotRecipes = theme.slotRecipes ?? {}

  const recipes = Object.keys(sysRecipes).map((key) => {
    const recipe = sysRecipes[key]
    const variantKeyMap = sys.cva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
        interface ${upperName}RecipeVariants {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const values = variantKeyMap[key]
              if (values.every(isBooleanValue)) return `${key}: boolean`
              return `${key}: ${unionType(values)}`
            })
            .join("\n")}
        }
        `
    return str
  })

  const recipeRecord = `
     export interface ConfigRecipes {
      ${Object.keys(sysRecipes)
        .map(
          (key) => `${key}: ConfigRecipeFn<${capitalize(key)}RecipeVariants>`,
        )
        .join("\n")}
     }
    `

  const recipeResult = [recipes.join("\n"), recipeRecord].join("\n")

  const slotRecipes = Object.keys(sysSlotRecipes).map((key) => {
    const recipe = sysSlotRecipes[key]
    const variantKeyMap = sys.sva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
        // ${upperName}
        
        type ${upperName}Slot = ${unionType(recipe.slots ?? [])}
        
        interface ${upperName}Variants {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const values = variantKeyMap[key]
              if (values.every(isBooleanValue)) return `${key}: boolean`
              return `${key}: ${unionType(values)}`
            })
            .join("\n")}
        }
        `
    return str
  })

  const slotRecipeRecord = `
     export interface ConfigSlotRecipes {
      ${Object.keys(sysSlotRecipes)
        .map(
          (key) =>
            `${key}: ConfigSlotRecipeFn<${capitalize(key)}Slot, ${capitalize(
              key,
            )}Variants>`,
        )
        .join("\n")}
     }
    `

  const slotRecipeResult = [slotRecipes.join("\n"), slotRecipeRecord].join("\n")

  return pretty(
    [
      'import type { ConfigRecipeFn, ConfigSlotRecipeFn } from "../recipe.types"',
      recipeResult,
      slotRecipeResult,
    ].join("\n"),
  )
}
