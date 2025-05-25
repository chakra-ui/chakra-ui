import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./pretty.js"

export function generateConditionResult(sys: SystemContext) {
  const keys = sys.conditions.keys().concat("base")
  const result = `
      export interface Conditions {
        ${keys
          .map((key) => {
            if (key === "base") {
              return `/** The base (=no conditions) styles to apply  */\n${key}: string`
            }
            const value = sys.conditions.resolve(key)
            return `/** \`${value}\` */\n'${key}': string`
          })
          .join("\n")}
      }
      `

  return result
}

export function generateCondition(sys: SystemContext) {
  return pretty(generateConditionResult(sys))
}
