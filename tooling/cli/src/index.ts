import "regenerator-runtime/runtime"
import * as path from "path"
import { Command, program } from "commander"
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
    .option(" --strict", "Generate strict types")
    .action(async (themeFile: string, command: Command) => {
      const { out, strict } = command.opts()
      await generateThemeTypings({ themeFile, out, strict })
    })

  program.on("--help", () => {
    console.info(`Example call:
  $ chakra-cli tokens theme.ts
`)
  })

  program.parse()
}
