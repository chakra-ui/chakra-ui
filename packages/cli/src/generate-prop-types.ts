import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./shared.js"

export async function generatePropTypes(sys: SystemContext, strict = false) {
  const { utility } = sys

  const result = [
    `
  import type { ConditionalValue, CssProperties } from "../css.types"
  import type { Tokens } from "./token.gen"

  type AnyString = (string & {})
  `,
  ]

  if (strict) {
    result.push(`
  type WithColorOpacityModifier<T> = T extends string ? \`$\{T}/\${string}\` : T

  type ImportantMark = "!" | "!important"
  type WhitespaceImportant = \` \${ImportantMark}\`
  type Important = ImportantMark | WhitespaceImportant
  
  type WithImportant<T> = T extends string ? \`\${T}\${Important}\` & { __important?: true } : T;
  type WithEscapeHatch<T> = T | \`[\${string}]\` | WithColorOpacityModifier<T> | WithImportant<T>
    `)
  }

  result.push(`

  interface PropertyValueTypes {
  `)

  const types = utility.getTypes()

  for (const [prop, values] of types.entries()) {
    result.push(`\t${prop}: ${values.join(" | ")};`)
  }

  result.push("}", "\n")

  if (strict) {
    result.push(`
    // eslint-disable-next-line
    type PropOrCondition<Value> = ConditionalValue<WithEscapeHatch<Value>>
    `)
  } else {
    result.push(`
    // eslint-disable-next-line
    type PropOrCondition<Value> = ConditionalValue<Value | AnyString>
    `)
  }

  result.push(`
    type CssValue<T> = T extends keyof CssProperties ? CssProperties[T] : never
  
    type Shorthand<T> = T extends keyof PropertyValueTypes ? PropertyValueTypes[T]${
      strict ? "" : " | CssValue<T>"
    } : CssValue<T>
  
    export interface PropertyTypes extends PropertyValueTypes {
    `)

  utility.shorthands.forEach((value, key) => {
    result.push(`\t${key}: Shorthand<${JSON.stringify(value)}>;`)
  })

  result.push("}")

  result.push(`
  type PropertyTypeValue<T extends string> = T extends keyof PropertyTypes
    ? PropOrCondition<PropertyTypes[T] | CssValue<T>>
    : never;
  
  type CssPropertyValue<T extends string> = T extends keyof CssProperties
    ? PropOrCondition<CssProperties[T]>
    : never;

  export type PropertyValue<T extends string> = T extends keyof PropertyTypes
    ? PropertyTypeValue<T>
    : T extends keyof CssProperties
      ? CssPropertyValue<T>
      : PropOrCondition<string | number>
  `)

  return pretty(result.join("\n"))
}
