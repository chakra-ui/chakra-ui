import "regenerator-runtime/runtime"
import * as path from "path"
import { Option, program } from "commander"
import chokidar from "chokidar"
import throttle from "lodash.throttle"
import { initCLI } from "./utils/init-cli"
import {
  generateThemeTypings,
  themeInterfaceDestination,
} from "./command/tokens"

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

      if (watch) {
        const watchPath =
          typeof watch === "string" ? watch : path.dirname(themeFile)
        const throttledGenerateThemeTypings = throttle(async () => {
          console.time("Duration")
          await generateThemeTypings({
            themeFile,
            out,
            strictComponentTypes,
            format,
            strictTokenTypes,
            template,
          })
          console.timeEnd("Duration")
          console.info(new Date().toLocaleString())
        }, 1_000)

        // run once to initialize
        throttledGenerateThemeTypings()

        chokidar.watch(watchPath).on("change", throttledGenerateThemeTypings)
        return
      }

      await generateThemeTypings({
        themeFile,
        out,
        strictComponentTypes,
        format,
        strictTokenTypes,
        template,
        onError: () => process.exit(1),
      })
    })

  program.on("--help", () => {
    console.info(`Example call:
  $ chakra-cli tokens theme.ts
`)
  })

  program.parse()
}
