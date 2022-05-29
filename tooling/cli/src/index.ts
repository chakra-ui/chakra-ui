import "regenerator-runtime/runtime"
import * as path from "path"
import { Command, program } from "commander"
import chokidar from "chokidar"
import { isString } from "@chakra-ui/utils"
import throttle from "lodash/throttle"
import { initCLI } from "./utils/init-cli"
import {
  generateThemeTypings,
  themeInterfaceDestination,
} from "./command/tokens"

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
    .option("--watch [path]", "Watch directory for changes and rebuild")
    .action(async (themeFile: string, command: Command) => {
      const { out, strictComponentTypes, watch } = command.opts()

      if (watch) {
        const watchPath = isString(watch) ? watch : path.dirname(themeFile)
        const throttledGenerateThemeTypings = throttle(async () => {
          console.time("Duration")
          await generateThemeTypings({
            themeFile,
            out,
            strictComponentTypes,
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
