import type { SystemContext } from "@chakra-ui/react"
import { generateCondition } from "./generate-conditions.js"
import { generatePropTypes } from "./generate-prop-types.js"
import { generateRecipe } from "./generate-recipe.js"
import { generateSystemTypes } from "./generate-system-types.js"
import { generateTokens } from "./generate-tokens.js"
import * as io from "./io.js"
import { tasks } from "./shared.js"

export function codegen(sys: SystemContext) {
  io.ensureDir(io.basePath)
  return tasks([
    {
      title: "Generating conditions types...",
      task: async () => {
        await io.write("conditions.gen", generateCondition(sys))
        return "✅ Generated conditions typings"
      },
    },
    {
      title: "Generating recipe types...",
      task: async () => {
        await io.write("recipes.gen", generateRecipe(sys))
        return "✅ Generated recipe typings"
      },
    },
    {
      title: "Generating utility types...",
      task: async () => {
        await io.write("prop-types.gen", generatePropTypes(sys))
        return "✅ Generated utility typings"
      },
    },
    {
      title: "Generating token types...",
      task: async () => {
        await io.write("token.gen", generateTokens(sys))
        return "✅ Generated token typings"
      },
    },
    {
      title: "Generating system types...",
      task: async () => {
        await io.write("system.gen", generateSystemTypes(sys))
        return "✅ Generated system types"
      },
    },
  ])
}
