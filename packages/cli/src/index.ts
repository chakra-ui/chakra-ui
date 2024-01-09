import { bundleNRequire } from "bundle-n-require"
import chokidar from "chokidar"
import { Option, program } from "commander"
import { join, resolve } from "node:path/posix"
import {
  generateThemeTypings,
  themeInterfaceDestination,
} from "./generate-theme-typings.js"
import { initCLI } from "./utils/init-cli.js"

interface OptionsType {
  out?: string
  strictComponentTypes?: boolean
  format: boolean
  watch?: string
  strictTokenTypes?: boolean
  template?: "default" | "augmentation"
}

export async function run() {
  await initCLI()

  program
    .command("tokens <source>")
    .option(
      "--out <path>",
      `output file e.g. ${join(...themeInterfaceDestination)}`,
    )
    .option(
      "--strict-component-types",
      "Generate strict types for props variant and size",
    )
    .option("--no-format", "Disable auto formatting")
    .option("--watch [path]", "Watch directory for changes and rebuild")
    .option(
      "--strict-token-types",
      "Generate strict types for theme tokens (e.g. color, spacing)",
    )
    .addOption(
      new Option(
        "--template <template>",
        "Choose the template to use for the generation",
      )
        .default("default")
        .choices(["default", "augmentation"]),
    )
    .action(async (themeFile: string, options: OptionsType) => {
      const {
        out,
        strictComponentTypes,
        format,
        strictTokenTypes,
        watch,
        template,
      } = options

      const read = async () => {
        const filePath = resolve(themeFile)
        const { mod, dependencies } = await bundleNRequire(filePath)
        const theme = mod.default || mod.theme || mod
        return { theme, dependencies }
      }

      let ctx = await read()

      const build = async () => {
        await generateThemeTypings({
          theme: ctx.theme,
          out,
          strictComponentTypes,
          format,
          strictTokenTypes,
          template,
        })

        if (watch) {
          console.log("\n", "⌛️ Watching for changes...")
        }
      }

      if (watch) {
        const watchPath = typeof watch === "string" ? watch : ctx.dependencies

        chokidar
          .watch(watchPath)
          .on("ready", build)
          .on("change", async (filePath) => {
            console.log("📦 File changed", filePath)
            ctx = await read()
            return build()
          })

        //
      } else {
        await build()
      }
    })

  program.on("--help", () => {
    console.info(`Example call:
    $ chakra-cli tokens theme.ts
  `)
  })

  program.parse()
}
