import type { SystemContext } from "@chakra-ui/react"
import { pretty } from "./shared.js"

export function generateCondition(sys: SystemContext) {
  const conditions = sys._config.conditions ?? {}
  const result = `
      export interface Conditions {
        ${Object.entries(conditions)
          .map(([key, value]) => {
            return `/** \`${value}\` */\n_${key}: string`
          })
          .join("\n")}
      }
      `
  return pretty(result)
}
