import "regenerator-runtime/runtime"
import path from "path"
import fs from "fs"
import { register } from "ts-node"
import { isObject } from "@chakra-ui/utils"
import { createThemeTypingsInterface } from "../command/tokens/create-theme-typings-interface"
import { themeKeyConfiguration } from "../command/tokens/config"

async function importTheme(path: string) {
  const module = await import(path)

  return module.default ?? module.theme
}

async function readTheme(themeFilePath: string) {
  const cwd = process.cwd()
  const absoluteThemePath = path.join(cwd, themeFilePath)

  register({
    project: path.join(__dirname, "..", "..", "bin", "tsconfig.json"),
  })

  try {
    await fs.promises.stat(absoluteThemePath)

    return importTheme(absoluteThemePath)
  } catch {
    return importTheme(require.resolve(themeFilePath, { paths: [cwd] }))
  }
}

/**
 * Reads the theme file, generates the typings interface and prints it to stdout
 */
async function run() {
  const themeFile = process.argv[2]

  if (!themeFile) {
    throw new Error("No path to theme file provided.")
  }

  const theme = await readTheme(themeFile)

  if (!isObject(theme)) {
    throw new Error("Theme not found in default or named `theme` export")
  }

  const template = await createThemeTypingsInterface(theme, {
    config: themeKeyConfiguration,
  })

  if (process.send) {
    process.send(template)
  } else {
    process.stdout.write(template)
  }
}

run().catch((e) => {
  if (process.send) {
    process.send({ err: e.toString() })
  } else {
    process.stderr.write(e.message)
  }
  process.exit(1)
})
