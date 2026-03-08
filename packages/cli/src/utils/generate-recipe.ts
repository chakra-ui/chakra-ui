import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./pretty.js"
import { capitalize, isBooleanValue, unionType } from "./shared.js"

export function generateRecipeImports() {
  return `import type { RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "../recipe.types"
       import type { ConditionalValue } from "../css.types"`
}

export function generateRecipeResult(sys: SystemContext) {
  const theme = sys._config.theme ?? {}
  const sysRecipes = theme.recipes ?? {}

  const recipes = Object.keys(sysRecipes).map((key) => {
    const recipe = sysRecipes[key]
    const variantKeyMap = sys.cva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
        export interface ${upperName}Variant {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const def = Reflect.get(recipe.defaultVariants ?? {}, key)
              const jsDoc =
                def !== undefined
                  ? `/** @default ${JSON.stringify(def)} */\n`
                  : ""

              const values = variantKeyMap[key]

              if (values.every(isBooleanValue)) {
                return `${jsDoc}${key}?: boolean | undefined`
              }

              return `${jsDoc}${key}?: ${unionType(values)} | undefined`
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

  return recipeResult
}

export function generateSlotRecipeResult(sys: SystemContext, strict = true) {
  const theme = sys._config.theme ?? {}
  const sysSlotRecipes = theme.slotRecipes ?? {}

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
              const jsDoc =
                def !== undefined
                  ? `/** @default ${JSON.stringify(def)} */\n`
                  : ""

              const values = variantKeyMap[key]

              if (values.every(isBooleanValue)) {
                return `${jsDoc}${key}?: boolean | undefined`
              }

              return `${jsDoc}${key}?: ${unionType(values, !strict)} | undefined`
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

  return slotRecipeResult
}

export function generateRecipeHelperTypes() {
  return `
      export type SlotRecipeRecord<T, K> = T extends keyof ConfigRecipeSlots
        ? Record<ConfigRecipeSlots[T], K>
        : Record<string, K>

      export type SlotRecipeProps<T> = T extends keyof ConfigSlotRecipes
        ? ConfigSlotRecipes[T]["__type"] & { recipe?: SlotRecipeDefinition | undefined }
        : { recipe?: SlotRecipeDefinition | undefined }

      export type RecipeProps<T> = T extends keyof ConfigRecipes
        ? ConfigRecipes[T]["__type"] & { recipe?: RecipeDefinition | undefined }
        : { recipe?: RecipeDefinition | undefined }
      `
}

/**
 * Generates recipe types for module augmentation.
 * Only emits interfaces (which TypeScript can merge) and inlines
 * type expressions to avoid re-declaring type aliases.
 */
export function generateRecipeResultForAugmentation(sys: SystemContext) {
  const theme = sys._config.theme ?? {}
  const sysRecipes = theme.recipes ?? {}

  const recipes = Object.keys(sysRecipes).map((key) => {
    const recipe = sysRecipes[key]
    const variantKeyMap = sys.cva(recipe).variantMap
    const upperName = capitalize(key)

    return `
        export interface ${upperName}Variant {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const def = Reflect.get(recipe.defaultVariants ?? {}, key)
              const jsDoc =
                def !== undefined
                  ? `/** @default ${JSON.stringify(def)} */\n`
                  : ""

              const values = variantKeyMap[key]

              if (values.every(isBooleanValue)) {
                return `${jsDoc}${key}?: boolean | undefined`
              }

              return `${jsDoc}${key}?: ${unionType(values)} | undefined`
            })
            .join("\n")}
        }
        `
  })

  const recipeKeys = Object.keys(sysRecipes)
  const recipeRecord = `
     export interface ConfigRecipes {
      ${
        recipeKeys.length
          ? Object.keys(sysRecipes)
              .map((key) => {
                const upperName = capitalize(key)
                return `${key}: SystemRecipeFn<{ [K in keyof ${upperName}Variant]?: ConditionalValue<${upperName}Variant[K]> | undefined }, { [K in keyof ${upperName}Variant]: Array<${upperName}Variant[K]> }>`
              })
              .join("\n")
          : "[key: string]: SystemRecipeFn<any>"
      }
     }
    `

  return [recipes.join("\n"), recipeRecord].join("\n")
}

/**
 * Generates slot recipe types for module augmentation.
 * Only emits interfaces and inlines slot/variant type expressions.
 */
export function generateSlotRecipeResultForAugmentation(
  sys: SystemContext,
  strict = true,
) {
  const theme = sys._config.theme ?? {}
  const sysSlotRecipes = theme.slotRecipes ?? {}

  const slotRecipeKeys = Object.keys(sysSlotRecipes)
  const slotRecipes = slotRecipeKeys.map((key) => {
    const recipe = sysSlotRecipes[key]
    const variantKeyMap = sys.sva(recipe).variantMap
    const upperName = capitalize(key)

    return `
        // ${upperName}

        export interface ${upperName}Variant {
          ${Object.keys(variantKeyMap)
            .map((key) => {
              const def = Reflect.get(recipe.defaultVariants ?? {}, key)
              const jsDoc =
                def !== undefined
                  ? `/** @default ${JSON.stringify(def)} */\n`
                  : ""

              const values = variantKeyMap[key]

              if (values.every(isBooleanValue)) {
                return `${jsDoc}${key}?: boolean | undefined`
              }

              return `${jsDoc}${key}?: ${unionType(values, !strict)} | undefined`
            })
            .join("\n")}
        }
        `
  })

  const slotRecipeRecord = `
     export interface ConfigSlotRecipes {
      ${
        slotRecipeKeys.length
          ? slotRecipeKeys
              .map((key) => {
                const recipe = sysSlotRecipes[key]
                const upperName = capitalize(key)
                const slotUnion = unionType(recipe.slots ?? [])
                return `${key}: SystemSlotRecipeFn<${slotUnion}, { [K in keyof ${upperName}Variant]?: ConditionalValue<${upperName}Variant[K]> | undefined }, { [K in keyof ${upperName}Variant]: Array<${upperName}Variant[K]> }>`
              })
              .join("\n")
          : "[key: string]: SystemSlotRecipeFn<string, any>"
      }
     }

     export interface ConfigRecipeSlots {
       ${
         slotRecipeKeys.length
           ? slotRecipeKeys
               .map((key) => {
                 const recipe = sysSlotRecipes[key]
                 return `${key}: ${unionType(recipe.slots ?? [])}`
               })
               .join("\n")
           : "[key: string]: string"
       }
    }
    `

  return [slotRecipes.join("\n"), slotRecipeRecord].join("\n")
}

export async function generateRecipe(sys: SystemContext, strict = true) {
  const imports = generateRecipeImports()
  const recipeResult = generateRecipeResult(sys)
  const slotRecipeResult = generateSlotRecipeResult(sys, strict)
  const recipeHelperTypes = generateRecipeHelperTypes()

  return pretty(
    [imports, recipeResult, slotRecipeResult, recipeHelperTypes].join("\n"),
  )
}
