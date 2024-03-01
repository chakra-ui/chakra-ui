import { SystemContext } from "@chakra-ui/react"
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
        await io.write("conditions.gen.d.ts", generateCondition(sys))
        return "✅ Generated conditions typings"
      },
    },
    {
      title: "Generating recipe types...",
      task: async () => {
        await io.write("recipe.gen.d.ts", generateRecipe(sys))
        return "✅ Generated recipe typings"
      },
    },
    {
      title: "Generating utility types...",
      task: async () => {
        await io.write("prop-types.gen.d.ts", generatePropTypes(sys))
        return "✅ Generated utility typings"
      },
    },
    {
      title: "Generating token types...",
      task: async () => {
        await io.write("token.gen.d.ts", generateTokens(sys))
        return "✅ Generated token typings"
      },
    },
    {
      title: "Generating system types...",
      task: async () => {
        await io.write("system.gen.d.ts", generateSystemTypes(sys))
        return "✅ Generated system types"
      },
    },
  ])
}
