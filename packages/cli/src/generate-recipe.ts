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
        export interface ${upperName}VariantProps {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const values = variantKeyMap[key]
              if (values.every(isBooleanValue)) return `${key}?: boolean`
              return `${key}?: ${unionType(values)}`
            })
            .join("\n")}
        }
        `
    return str
  })

  const recipeKeys = Object.keys(sysRecipes)
  const recipeRecord = `
     export interface ConfigRecipes {
      ${
        recipeKeys.length
          ? Object.keys(sysRecipes)
              .map(
                (key) =>
                  `${key}: SystemRecipeFn<${capitalize(key)}VariantProps>`,
              )
              .join("\n")
          : "[key: string]: SystemRecipeFn<any>"
      }
     }
    `

  const recipeResult = [recipes.join("\n"), recipeRecord].join("\n")

  const slotRecipeKeys = Object.keys(sysSlotRecipes)
  const slotRecipes = slotRecipeKeys.map((key) => {
    const recipe = sysSlotRecipes[key]
    const variantKeyMap = sys.sva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
        // ${upperName}
        
        export type ${upperName}Slot = ${unionType(recipe.slots ?? [])}
        
        export interface ${upperName}VariantProps {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const values = variantKeyMap[key]
              if (values.every(isBooleanValue)) return `${key}?: boolean`
              return `${key}?: ${unionType(values)}`
            })
            .join("\n")}
        }
        `
    return str
  })

  const slotRecipeRecord = `
     export interface ConfigSlotRecipes {
      ${
        slotRecipeKeys.length
          ? slotRecipeKeys
              .map(
                (key) =>
                  `${key}: SystemSlotRecipeFn<${capitalize(
                    key,
                  )}Slot, ${capitalize(key)}VariantProps>`,
              )
              .join("\n")
          : "[key: string]: SystemSlotRecipeFn<string, any>"
      }
     }

     export interface ConfigRecipeSlots {
       ${
         slotRecipeKeys.length
           ? slotRecipeKeys
               .map((key) => `${key}: ${capitalize(key)}Slot`)
               .join("\n")
           : "[key: string]: string"
       }
    }
    `

  const slotRecipeResult = [slotRecipes.join("\n"), slotRecipeRecord].join("\n")

  return pretty(
    [
      'import type { RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"',
      recipeResult,
      slotRecipeResult,
      `

      export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots
        ? Record<ConfigRecipeSlots[T], K>
        : Record<string, K>

      export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
        ? ConfigSlotRecipes[T]["__type"] & { recipe?: SlotRecipeDefinition }
        : { recipe?: SlotRecipeDefinition }

      export type RecipeProps<T> = T extends keyof ConfigRecipes
        ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition }
        : { recipe?: RecipeDefinition }
      `,
    ].join("\n"),
  )
}
