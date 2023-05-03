import { bundleNRequire } from "bundle-n-require"
import chokidar from "chokidar"
import { Option, program } from "commander"
import * as path from "path"
import {
  generateThemeTypings,
  themeInterfaceDestination,
} from "./command/tokens"
import { initCLI } from "./utils/init-cli"

type OptionsType = {
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
      `output file e.g. ${path.join(...themeInterfaceDestination)}`,
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
        const filePath = path.resolve(themeFile)
        const { mod: theme, dependencies } = await bundleNRequire(filePath)
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
