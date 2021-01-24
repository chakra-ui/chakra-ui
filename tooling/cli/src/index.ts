import "regenerator-runtime/runtime"
import * as path from "path"
import { writeFile } from "fs"
import { promisify } from "util"
import { register } from "ts-node"
import { program } from "commander"
import { isObject } from "@chakra-ui/utils"
import { createThemeTypingsInterface } from "./create-theme-typings-interface"
import { destination, resolveOutputPath } from "./resolve-output-path"
import { themeKeyConfiguration } from "./config"
import { initCLI } from "./init-cli"
import ora from "ora"

const writeFileAsync = promisify(writeFile)

async function readTheme(themeFilePath: string) {
  const absoluteThemePath = path.join(process.cwd(), themeFilePath)
  register({
    project: path.join(__dirname, "..", "bin", "tsconfig.json"),
    dir: path.basename(absoluteThemePath),
  })
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const module = require(absoluteThemePath)
  return module.default ?? module.theme
}

async function generateThemeTypings({
  themeFile,
  out,
}: {
  themeFile: string
  out: string
}) {
  const spinner = ora("Generating chakra theme typings").start()

  spinner.text = `Reading theme file "${themeFile}"...`
  const theme = await readTheme(themeFile)

  if (!isObject(theme)) {
    console.error("❌ Theme not found in default or named `theme` export")
    process.exit(1)
  }

  spinner.info()
  spinner.text = `Creating theme interface...`
  const template = await createThemeTypingsInterface(theme, {
    config: themeKeyConfiguration,
  })

  const outPath = await resolveOutputPath(out)

  spinner.info()
  spinner.text = `Write file "${outPath}"...`
  await writeFileAsync(outPath, template, "utf8")
  spinner.succeed("Done")
  spinner.stop()
}

export async function run() {
  initCLI()

  program
    .command("tokens <source>")
    .option("--out <path>", `output file e.g. ${path.join(...destination)}`)
    .action(async (themeFile: string, commander: any) => {
      const { out } = commander.opts()
      await generateThemeTypings({ themeFile, out })
    })

  program.on("--help", () => {
    console.info(`Example call:
  $ chakra-cli tokens theme.ts
`)
  })

  program.parse()
}
