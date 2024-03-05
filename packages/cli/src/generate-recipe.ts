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
     export interface SystemRecipes {
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
     export interface SystemSlotRecipes {
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

     export interface SystemRecipeSlot<T> {
       ${
         slotRecipeKeys.length
           ? slotRecipeKeys
               .map((key) => `${key}: ${capitalize(key)}Slot`)
               .join("\n")
           : "[key: string]: string"
       }
    `

  const slotRecipeResult = [slotRecipes.join("\n"), slotRecipeRecord].join("\n")

  return pretty(
    [
      'import type { SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"',
      recipeResult,
      slotRecipeResult,
      `
      
      export type SystemRecipeProps<T> = T extends keyof SystemRecipes
        ? SystemRecipes[T]["__type"]
        : T extends keyof SystemSlotRecipes
        ? SystemSlotRecipes[T]["__type"]
        : {}
      
      `,
    ].join("\n"),
  )
}
