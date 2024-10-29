import type { SystemContext } from "@chakra-ui/react"
import { allCssProperties } from "@pandacss/is-valid-prop"
import { pretty } from "./pretty.js"

export async function generateSystemTypes(sys: SystemContext) {
  const props = new Set(
    allCssProperties.concat(sys.utility.keys()).filter(Boolean),
  )
  const propTypes = sys.utility.getTypes()

  const shouldImportTypeWithEscapeHatch = sys._config.strictTokens

  const result = `
  import type { ConditionalValue, CssProperties } from "../css.types"
  ${
    shouldImportTypeWithEscapeHatch
      ? `import type { UtilityValues, WithEscapeHatch } from "./prop-types.gen"`
      : `import type { UtilityValues } from "./prop-types.gen"`
  }
  import type { Token } from "./token.gen"
  type AnyString = (string & {})
  type AnyNumber = (number & {})
  type CssVars = \`var(--\${string})\`
  type CssVarValue = ConditionalValue<Token | CssVars | AnyString | AnyNumber>
  type CssVarKey = \`--\${string}\`
  export type CssVarProperties = {
      [key in CssVarKey]?: CssVarValue
  }
  
  export interface SystemProperties {
    ${Array.from(props)
      .map((key) => {
        // mt -> marginTop
        const prop = sys.utility.shorthands.get(key) ?? key
        const union = []
        // `scaleX` isn't a valid css property, will fallback to `string | number`
        const cssFallback = allCssProperties.includes(prop)
          ? `CssProperties["${prop}"]`
          : ""
        // has values (utility or tokens)
        if (propTypes.has(prop)) {
          const utilityValue = `UtilityValues["${prop}"]`
          if (strictPropertyList.has(key)) {
            union.push([utilityValue, "CssVars"].join(" | "))
          } else {
            union.push(
              [
                utilityValue,
                "CssVars",
                sys._config.strictTokens ? "" : cssFallback,
              ]
                .filter(Boolean)
                .join(" | "),
            )
          }
        } else {
          union.push(
            [strictPropertyList.has(key) ? "CssVars" : "", cssFallback]
              .filter(Boolean)
              .join(" | "),
          )
        }
        const filtered = union.filter(Boolean)
        // most likely a custom utility that maps to a CSS variable
        if (!filtered.length) {
          filtered.push("string | number")
        }
        const value = filtered.filter(Boolean).join(" | ")
        return `${key}?: ${restrict(prop, value, sys)}`
      })
      .join("\n")}
  }
      `

  return pretty(result)
}

// TODO: Update when we support strictPropertyValues
const strictPropertyList = new Set<string>([])

const restrict = (_key: string, value: string, sys: SystemContext) => {
  const { _config: config } = sys

  // if (config.strictPropertyValues && strictPropertyList.has(key)) {
  //   return `ConditionalValue<WithEscapeHatch<OnlyKnown<"${key}", ${value}>>>`
  // }

  if (config.strictTokens) return `ConditionalValue<WithEscapeHatch<${value}>>`
  return `ConditionalValue<${value} | AnyString>`
}
