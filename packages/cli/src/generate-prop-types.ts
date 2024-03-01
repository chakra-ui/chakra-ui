import { SystemContext } from "@chakra-ui/react"
import { pretty } from "./shared.js"

export async function generatePropTypes(sys: SystemContext, strict = false) {
  const { utility } = sys

  const result = [
    `
  import type { ConditionalValue, CssProperties } from "../css.types"
  import type { Tokens } from "./token.gen"
  
  interface PropertyValueTypes {`,
  ]

  const types = utility.getTypes()

  for (const [prop, values] of types.entries()) {
    result.push(`\t${prop}: ${values.join(" | ")};`)
  }

  result.push("}", "\n")

  result.push(`
    type PropOrCondition<Key, Value> = ConditionalValue<Value | (string & {})>
  `)

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
    ? PropOrCondition<T, PropertyTypes[T] | CssValue<T>>
    : never;
  
  type CssPropertyValue<T extends string> = T extends keyof CssProperties
    ? PropOrCondition<T, CssProperties[T]>
    : never;

  export type PropertyValue<T extends string> = T extends keyof PropertyTypes
    ? PropertyTypeValue<T>
    : T extends keyof CssProperties
      ? CssPropertyValue<T>
      : PropOrCondition<T, string | number>
  `)

  return pretty(result.join("\n"))
}
