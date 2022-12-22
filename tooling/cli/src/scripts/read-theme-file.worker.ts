import "regenerator-runtime/runtime"
import path from "path"
import fs from "fs"
import * as tsNode from "ts-node"
import * as tsConfigPaths from "tsconfig-paths"
import {
  createThemeTypingsInterface,
  TypingsTemplate,
} from "../command/tokens/create-theme-typings-interface"
import { themeKeyConfiguration } from "../command/tokens/config"
import { isObject } from "../utils/is-object"

const bold = (text: string) => `\x1b[1m${text}\x1b[22m`

async function importTheme(path: string) {
  const module = await import(path)
  const theme = module.default ?? module.theme

  if (!theme)
    throw new Error(`
    Theme export not found in module: '${path}'.

    A theme should have a ${bold("default")} export or a ${bold(
      "theme",
    )} named export.
    Found the following exports: ${bold(Object.keys(module).join(", "))}
  `)

  return theme
}

async function readTheme(themeFilePath: string) {
  const cwd = process.cwd()
  const absoluteThemePath = path.join(cwd, themeFilePath)
  const absoluteThemeDir = path.dirname(absoluteThemePath)

  const tsConfig = tsConfigPaths.loadConfig(absoluteThemeDir)
  if (tsConfig.resultType === "success") {
    tsNode.register({
      // use the TS projects own tsconfig file
      project: tsConfig.configFileAbsolutePath,
      compilerOptions: {
        module: "CommonJS",
        esModuleInterop: true,
      },
      transpileOnly: true,
      swc: true,
    })

    // registers a loader to help node `require` on paths in the tsConfig `paths`
    tsConfigPaths.register()
  } else {
    // it is a JS project
    const defaultProject = path.join(
      __dirname,
      "..",
      "..",
      "bin",
      "tsconfig.json",
    )
    tsNode.register({
      project: defaultProject,
    })
  }

  try {
    await fs.promises.stat(absoluteThemePath)

    return await importTheme(absoluteThemePath)
  } catch (statError) {
    try {
      return importTheme(require.resolve(themeFilePath, { paths: [cwd] }))
    } catch (resolveError) {
      throw new Error(
        `Theme file or package not found \n${statError} \n${resolveError}`,
      )
    }
  }
}

/**
 * Reads the theme file, generates the typings interface and prints it to stdout
 */
async function run() {
  const themeFile = process.argv[2]
  const strictComponentTypes = process.argv.includes("--strict-component-types")
  const format = process.argv.includes("--format")
  const strictTokenTypes = process.argv.includes("--strict-token-types")
  const templateArg = process.argv.find((arg) => arg.includes("--template="))
  const template = templateArg ? templateArg.split("=")[1] : undefined

  if (!themeFile) {
    throw new Error("No path to theme file provided.")
  }

  console.log(themeFile)
  const theme = await readTheme(themeFile)

  if (!isObject(theme)) {
    throw new Error("Theme not found in default or named `theme` export")
  }

  const themeTypings = await createThemeTypingsInterface(theme, {
    config: themeKeyConfiguration,
    strictComponentTypes,
    format,
    strictTokenTypes,
    template: template as TypingsTemplate,
  })

  if (process.send) {
    process.send(themeTypings)
  } else {
    process.stdout.write(themeTypings)
  }
}

run().catch((e: Error) => {
  const err = `${e.toString()}\n${e.stack}`

  if (process.send) {
    process.send({ err })
  } else {
    process.stderr.write(err)
  }
  process.exit(1)
})
