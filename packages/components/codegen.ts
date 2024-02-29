import { bundleNRequire } from "bundle-n-require"
import { outdent } from "outdent"
import { format } from "prettier"
import { allCssProperties } from "./src/styled-system-new/is-valid-prop"
import { tokenCategories } from "./src/styled-system-new/token-dictionary"
import { SystemContext } from "./src/styled-system-new/types"

function unionType(values: Iterable<any>) {
  return Array.from(values)
    .map((value) => JSON.stringify(value))
    .join(" | ")
}

function pretty(value: any) {
  return format(value, { parser: "typescript" })
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const isBooleanValue = (value: string) => value === "true" || value === "false"

function genCondition(sys: SystemContext) {
  const _conditions = `
    export interface PropertyValueTypes {
      ${Object.entries(conditions)
        .map(([key, value]) => {
          return `/** \`${value}\` */\n_${key}: string`
        })
        .join("\n")}
    }
    `

  return pretty(_conditions)
}

const strictTokens = false

async function genUtility(sys: SystemContext) {
  const result = [
    outdent`
      interface PropertyValueTypes {`,
  ]

  const types = utility.getTypes()

  for (const [prop, values] of types.entries()) {
    result.push(`\t${prop}: ${values.join(" | ")};`)
  }

  result.push("}", "\n")

  result.push(`
      type CssValue<T> = T extends keyof CssProperties ? CssProperties[T] : never
    
      type Shorthand<T> = T extends keyof PropertyValueTypes ? PropertyValueTypes[T]${
        strictTokens ? "" : " | CssValue<T>"
      } : CssValue<T>
    
      export interface PropertyTypes extends PropertyValueTypes {
      `)

  //   utility.shorthands.forEach((value, key) => {
  //     result.push(`\t${key}: Shorthand<${JSON.stringify(value)}>;`)
  //   })

  result.push("}")

  console.log(await pretty(result.join("\n")))

  return ""
}

async function genSystem(sys: SystemContext) {
  const props = new Set(
    allCssProperties.concat(sys.utility.keys()).filter(Boolean),
  )

  const res = `
    export type CssVarProperties = {
      [key in \`--\${string}\`]?: ConditionalValue<Token | (string & {}) | (number & {})>
    }

    export interface SystemProperties {
      ${Array.from(props)
        .map((v) => `\t${v}?: PropertyValue<'${v}'>`)
        .join("\n")}
    }
    `

  console.log(await pretty(res))
}

async function genToken(sys: SystemContext) {
  const isTokenEmpty = sys.tokens.allTokens.length === 0

  const set = new Set<string>()

  set.add(
    `export type Token = ${
      isTokenEmpty
        ? "string"
        : unionType(Array.from(sys.tokens.tokenMap.keys()))
    }`,
  )

  const result = new Set<string>(["export type Tokens = {"])

  if (isTokenEmpty) {
    result.add("[token: string]: string")
  } else {
    const colorPaletteKeys = Array.from(sys.tokens.colorPaletteMap.keys())
    if (colorPaletteKeys.length) {
      set.add(`export type ColorPalette = ${unionType(colorPaletteKeys)}`)
    }

    for (const [key, value] of sys.tokens.categoryMap.entries()) {
      const typeName = capitalize(key)
      set.add(`export type ${typeName}Token = ${unionType(value.keys())}`)
      result.add(`\t\t${key}: ${typeName}Token`)
    }

    if (sys._theme?.keyframes)
      set.add(
        `export type AnimationName = ${unionType(
          Object.keys(sys._theme.keyframes),
        )}`,
      )

    result.add(`\t\tanimationName: AnimationName`)
  }

  result.add("} & { [token: string]: never }")

  set.add(Array.from(result).join("\n"))

  set.add(`export type TokenCategory = ${unionType(tokenCategories)}`)

  return pretty(Array.from(set).join("\n\n"))
}

async function genRecipe(sys: SystemContext) {
  const sysRecipes = sys._theme.recipes ?? {}
  const sysSlotRecipes = sys._theme.slotRecipes ?? {}

  const recipes = Object.keys(sysRecipes).map((key) => {
    const recipe = sysRecipes[key]
    const variantKeyMap = sys.cva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
      export interface ${upperName}RecipeVariants {
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
      .map((key) => `${key}: ConfigRecipeFn<${capitalize(key)}RecipeVariants>`)
      .join("\n")}
   }
  `

  const recipeResult = [recipes.join("\n"), recipeRecord].join("\n")

  const slotRecipes = Object.keys(sysSlotRecipes).map((key) => {
    const recipe = sysSlotRecipes[key]
    const variantKeyMap = sys.sva(recipe).variantMap
    const upperName = capitalize(key)

    const str = `
      export type ${upperName}Slot = ${unionType(recipe.slots ?? [])}
      export interface ${upperName}Variants {
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

async function main() {
  const res = await bundleNRequire("./src/styled-system-new/fixture.ts")
  const sys = res.mod.systemBase

  // const sys = createSystem(res.mod.presetBase)

  //   const _utils = await genUtility(sys)
  //   const _conds = await genCondition(sys)
  //   const _system = await genSystem(sys)
  // const _token = await genToken(sys)
  const tt = await genRecipe(sys)
  console.log(tt)

  //   console.log({ _conds })
}

main()
