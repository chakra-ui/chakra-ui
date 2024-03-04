import type { SystemContext } from "@chakra-ui/react"
import { allCssProperties } from "../../react/src/styled-system/is-valid-prop.js"
import { pretty } from "./shared.js"

export async function generateSystemTypes(sys: SystemContext) {
  const props = new Set(
    allCssProperties.concat(sys.utility.keys()).filter(Boolean),
  )

  const result = `
  import { ConditionalValue } from "../css.types"
  import { PropertyValue } from "./prop-types.gen"
  import { Token } from "./token.gen"

  export type CssVarProperties = {
      [key in \`--\${string}\`]?: ConditionalValue<Token | (string & {}) | (number & {})>
  }
  
  export interface SystemProperties {
    ${Array.from(props)
      .map((v) => `\t${v}?: PropertyValue<'${v}'>`)
      .join("\n")}
  }
      `

  return pretty(result)
}
