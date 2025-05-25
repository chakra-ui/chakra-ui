import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./pretty.js"

export function generatePropTypesImports(isDefaultOutdir: boolean) {
  const result = []

  result.push(
    `import type { CssProperties } from "${isDefaultOutdir ? "../css.types" : "@chakra-ui/react"}"`,
  )
  if (isDefaultOutdir) {
    result.push(`import type { UtilityValues } from "./prop-types.gen"`)
  }

  return result.join("\n")
}

export function generatePropTypesResult(sys: SystemContext) {
  const { utility } = sys
  const result = []
  result.push(`
  type WithColorOpacityModifier<T> = T extends string ? \`$\{T}/\${string}\` : T
  type ImportantMark = "!" | "!important"
  type WhitespaceImportant = \` \${ImportantMark}\`
  type Important = ImportantMark | WhitespaceImportant
  
  type WithImportant<T> = T extends string ? \`\${T}\${Important}\` & { __important?: true } : T;
  
  export type WithEscapeHatch<T> = T | \`[\${string}]\` | WithColorOpacityModifier<T> | WithImportant<T>
  // eslint-disable-next-line
  export type OnlyKnown<Value> = Value extends boolean ? Value : Value extends \`\${infer _}\` ? Value : never
  `)

  result.push(`
  export interface UtilityValues {
  `)

  const types = utility.getTypes()

  for (const [prop, values] of types.entries()) {
    result.push(`\t${prop}: ${values.join(" | ")};`)
  }

  result.push("}", "\n")

  return result.join("\n")
}

export async function generatePropTypes(
  sys: SystemContext,
  isDefaultOutdir: boolean,
) {
  const imports = generatePropTypesImports(isDefaultOutdir)
  const propTypesResult = generatePropTypesResult(sys)

  return pretty([imports, propTypesResult].join("\n"))
}
