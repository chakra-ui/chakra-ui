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

const writeFileAsync = promisify(writeFile)

function readTheme(themeFilePath: string) {
  const absoluteThemePath = path.join(process.cwd(), themeFilePath)
  register({
    project: path.join(__dirname, "..", "bin", "tsconfig.json"),
    dir: path.basename(absoluteThemePath),
  })
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const module = require(absoluteThemePath)
  return module.default ?? module.theme
}

export async function run() {
  program.option(
    "--out <path>",
    `output directory e.g. ${path.join(...destination)}`,
  )
  program.on("--help", () => {
    console.info(`Example call:
  $ create-chakra-theme-typings theme.ts
`)
  })
  program.parse(process.argv)

  const {
    out,
    args: [themeFile],
  } = program

  console.info(`👀 Reading theme file "${themeFile}"...`)
  const theme = readTheme(themeFile)

  if (!isObject(theme)) {
    console.error("❌ Theme not found in default or named `theme` export")
    process.exit(1)
  }

  console.info(`💭 Creating theme interface...`)
  const template = await createThemeTypingsInterface(theme, {
    config: themeKeyConfiguration,
  })

  const outPath = await resolveOutputPath(out)

  console.info(`✏️  Write file "${outPath}"...`)
  await writeFileAsync(outPath, template, "utf8")
  console.info(`✅ done`)
}
