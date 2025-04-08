import type { SystemContext } from "@chakra-ui/react"
import * as p from "@clack/prompts"
import { Command } from "commander"
import createDebug from "debug"
import { writeFileSync } from "fs"
import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { generateCondition } from "../utils/generate-conditions"
import { generatePropTypes } from "../utils/generate-prop-types"
import { generateRecipe } from "../utils/generate-recipe"
import { generateSystemTypes } from "../utils/generate-system-types"
import { generateTokens } from "../utils/generate-tokens"
import * as io from "../utils/io"
import { tasks } from "../utils/tasks"

const debug = createDebug("chakra:typegen")

const req = createRequire(import.meta.url)

const getDefaultBasePath = () => {
  const cwd = process.cwd()

  if (!process.env.LOCAL) {
    const root = req.resolve("@chakra-ui/react", { paths: [cwd] })
    return resolve(root, "..", "..", "types", "styled-system", "generated")
  }

  const root = join(cwd, "packages", "react", "src")
  return join(root, "styled-system", "generated")
}

interface CodegenFlags {
  strict?: boolean
  format?: boolean
  watch?: string
  clean?: boolean
  outdir: string
}

export const TypegenCommand = new Command("typegen")
  .argument("<source>", "path to the theme file")
  .description("Generate theme and recipe typings")
  .option("--strict", "Generate strict types for props variant and size")
  .option("--watch [path]", "Watch directory for changes and rebuild")
  .option("--clean", "Clean the output directory")
  .option(
    "--outdir <dir>",
    "Output directory to write the generated types",
    getDefaultBasePath(),
  )
  .action(async (source: string, flags: CodegenFlags) => {
    debug("source", source)
    debug("flags", flags)

    if (flags.clean) {
      debug("cleaning output directory", flags.outdir)
      await io.clean(flags.outdir)
    }

    let result = await io.read(source)

    if (process.env.DEBUG) {
      const configPath = resolve("chakra-config.json")
      debug("writing bundled source to", configPath)
      const config = (result as any).mod._config
      writeFileSync("chakra-config.json", JSON.stringify(config, null, 2))
    }

    const build = async () => {
      await codegen(result.mod, flags)

      if (flags.watch) {
        p.log.info("\n⌛️ Watching for changes...")
      }
    }

    if (!flags.watch) {
      await build()
    } else {
      debug("watch dependencies", result.dependencies)
      io.watch(result.dependencies, async () => {
        result = await io.read(source)
        return build()
      })
    }

    p.outro("🎉 Done!")
  })

function codegen(sys: SystemContext, flags: CodegenFlags) {
  io.ensureDir(flags.outdir)
  debug("writing codegen to", flags.outdir)

  return tasks([
    {
      title: "Generating conditions types...",
      task: async () => {
        await io.write(flags.outdir, "conditions.gen", generateCondition(sys))
        return "✅ Generated conditions typings"
      },
    },
    {
      title: "Generating recipe types...",
      task: async () => {
        await io.write(
          flags.outdir,
          "recipes.gen",
          generateRecipe(sys, flags.strict),
        )
        return "✅ Generated recipe typings"
      },
    },
    {
      title: "Generating utility types...",
      task: async () => {
        await io.write(flags.outdir, "prop-types.gen", generatePropTypes(sys))
        return "✅ Generated utility typings"
      },
    },
    {
      title: "Generating token types...",
      task: async () => {
        await io.write(flags.outdir, "token.gen", generateTokens(sys))
        return "✅ Generated token typings"
      },
    },
    {
      title: "Generating system types...",
      task: async () => {
        await io.write(flags.outdir, "system.gen", generateSystemTypes(sys))
        return "✅ Generated system types"
      },
    },
  ])
}
