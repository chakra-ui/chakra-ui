import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./pretty.js"
import { capitalize, isBooleanValue, unionType } from "./shared.js"

export async function generateRecipe(sys: SystemContext, strict = true) {
  const theme = sys._config.theme ?? {}

  const sysRecipes = theme.recipes ?? {}
  const sysSlotRecipes = theme.slotRecipes ?? {}

  const recipes = Object.keys(sysRecipes).map((key) => {
    const recipe = sysRecipes[key]
    const variantKeyMap = sys.cva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
        export interface ${upperName}Variant {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const def = Reflect.get(recipe.defaultVariants ?? {}, key)
              const jsDoc = def
                ? `/** @default ${JSON.stringify(def)} */\n`
                : ""

              const values = variantKeyMap[key]

              if (values.every(isBooleanValue)) {
                return `${jsDoc}${key}?: boolean`
              }

              return `${jsDoc}${key}?: ${unionType(values)}`
            })
            .join("\n")}
        }

        export type ${upperName}VariantProps = {
          [K in keyof ${upperName}Variant]?: ConditionalValue<${upperName}Variant[K]> | undefined
        }

        export type ${upperName}VariantMap = {
          [K in keyof ${upperName}Variant]: Array<${upperName}Variant[K]>
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
              .map((key) => {
                const upperName = capitalize(key)
                return `${key}: SystemRecipeFn<${upperName}VariantProps, ${upperName}VariantMap>`
              })
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
        
        export interface ${upperName}Variant {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const def = Reflect.get(recipe.defaultVariants ?? {}, key)
              const jsDoc = def
                ? `/** @default ${JSON.stringify(def)} */\n`
                : ""

              const values = variantKeyMap[key]

              if (values.every(isBooleanValue)) {
                return `${jsDoc}${key}?: boolean`
              }

              return `${jsDoc}${key}?: ${unionType(values, !strict)}`
            })
            .join("\n")}
        }

        export type ${upperName}VariantProps = {
          [K in keyof ${upperName}Variant]?: ConditionalValue<${upperName}Variant[K]> | undefined
        }

        export type ${upperName}VariantMap = {
          [K in keyof ${upperName}Variant]: Array<${upperName}Variant[K]>
        }
        `
    return str
  })

  const slotRecipeRecord = `
     export interface ConfigSlotRecipes {
      ${
        slotRecipeKeys.length
          ? slotRecipeKeys
              .map((key) => {
                const upperName = capitalize(key)
                return `${key}: SystemSlotRecipeFn<${upperName}Slot, ${upperName}VariantProps, ${upperName}VariantMap>`
              })
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
      'import type { ConditionalValue } from "../css.types"',
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
