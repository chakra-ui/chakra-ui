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
import { generateThemeAugmentationTypes } from "../utils/generate-theme-augmentation-types"
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

export interface CodegenFlags {
  strict?: boolean
  format?: boolean
  watch?: string
  clean?: boolean
  outdir?: string
  tsconfig?: string
}

export const TypegenCommand = new Command("typegen")
  .argument("<source>", "path to the theme file")
  .description("Generate theme and recipe typings")
  .option("--strict", "Generate strict types for props variant and size")
  .option("--watch [path]", "Watch directory for changes and rebuild")
  .option("--clean", "Clean the output directory")
  .option(
    "--outdir <dir>",
    "Ship the generated types with your codebase: writes a single module augmentation file (declare module '@chakra-ui/react') to <dir>. When omitted, the internal .gen types are written to the default in-package location.",
  )
  .option(
    "--tsconfig <path>",
    "Path to tsconfig file for resolving path aliases",
  )
  .action(async (source: string, flags: CodegenFlags) => {
    debug("source", source)
    debug("flags", flags)

    // Passing --outdir is the deliberate signal to ship types with your codebase:
    // with it we emit a single module augmentation file; without it we regenerate
    // the internal .gen types in the default in-package location.
    const augment = flags.outdir != null
    const outdir = flags.outdir ?? getDefaultBasePath()

    if (flags.clean) {
      debug("cleaning output directory", outdir)
      await io.clean(outdir)
    }

    let result = await io.read(source, { tsconfig: flags.tsconfig })

    if (process.env.DEBUG) {
      const configPath = resolve("chakra-config.json")
      debug("writing bundled source to", configPath)
      const config = (result as any).mod._config
      writeFileSync("chakra-config.json", JSON.stringify(config, null, 2))
    }

    const build = async () => {
      await codegen(result.mod, flags, outdir, augment)

      if (flags.watch) {
        p.log.info("\n⌛️ Watching for changes...")
      }
    }

    if (!flags.watch) {
      await build()
    } else {
      debug("watch dependencies", result.dependencies)
      io.watch(result.dependencies, async () => {
        result = await io.read(source, { tsconfig: flags.tsconfig })
        return build()
      })
    }

    p.outro("🎉 Done!")
  })

function codegen(
  sys: SystemContext,
  flags: CodegenFlags,
  outdir: string,
  augment: boolean,
) {
  io.ensureDir(outdir)
  debug("writing codegen to", outdir)

  if (augment) {
    return tasks([
      {
        title: "Generating theme augmentation types...",
        task: async () => {
          await io.write(
            outdir,
            "theme-typings",
            generateThemeAugmentationTypes(sys, flags),
          )
          return "✅ Generated theme augmentation types"
        },
      },
    ])
  }

  return tasks([
    {
      title: "Generating conditions types...",
      task: async () => {
        await io.write(outdir, "conditions.gen", generateCondition(sys))
        return "✅ Generated conditions typings"
      },
    },
    {
      title: "Generating recipe types...",
      task: async () => {
        await io.write(outdir, "recipes.gen", generateRecipe(sys, flags.strict))
        return "✅ Generated recipe typings"
      },
    },
    {
      title: "Generating utility types...",
      task: async () => {
        await io.write(outdir, "prop-types.gen", generatePropTypes(sys))
        return "✅ Generated utility typings"
      },
    },
    {
      title: "Generating token types...",
      task: async () => {
        await io.write(outdir, "token.gen", generateTokens(sys))
        return "✅ Generated token typings"
      },
    },
    {
      title: "Generating system types...",
      task: async () => {
        await io.write(outdir, "system.gen", generateSystemTypes(sys))
        return "✅ Generated system types"
      },
    },
  ])
}
