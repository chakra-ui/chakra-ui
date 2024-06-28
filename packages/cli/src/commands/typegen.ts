import type { SystemContext } from "@chakra-ui/react"
import * as p from "@clack/prompts"
import { Command } from "commander"
import { generateCondition } from "../utils/generate-conditions"
import { generatePropTypes } from "../utils/generate-prop-types"
import { generateRecipe } from "../utils/generate-recipe"
import { generateSystemTypes } from "../utils/generate-system-types"
import { generateTokens } from "../utils/generate-tokens"
import * as io from "../utils/io"
import { tasks } from "../utils/shared"

interface CodegenFlags {
  strict?: boolean
  format?: boolean
  watch?: string
  clean?: boolean
}

export const TypegenCommand = new Command("typegen")
  .argument("<source>", "path to the theme file")
  .description("Generate theme and recipe typings")
  .option("--strict", "Generate strict types for props variant and size")
  .option("--format", "Disable auto formatting")
  .option("--watch [path]", "Watch directory for changes and rebuild")
  .option("--clean", "Clean the output directory")
  .action(async (source: string, flags: CodegenFlags) => {
    if (flags.clean) {
      await io.clean()
    }

    let result = await io.read(source)

    const build = async () => {
      await codegen(result.mod)

      if (flags.watch) {
        p.log.info("\n⌛️ Watching for changes...")
      }
    }

    if (!flags.watch) {
      await build()
    } else {
      io.watch(result.dependencies, async () => {
        result = await io.read(source)
        return build()
      })
    }

    p.outro("🎉 Done!")
  })

function codegen(sys: SystemContext) {
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
