import "regenerator-runtime/runtime"
import path from "path"
import fs from "fs"
import * as tsNode from "ts-node"
import * as tsConfigPaths from "tsconfig-paths"
import moduleAlias from "module-alias"
import { isObject } from "@chakra-ui/utils"
import { createThemeTypingsInterface } from "../command/tokens/create-theme-typings-interface"
import { themeKeyConfiguration } from "../command/tokens/config"

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
      },
    })

    /**
     * Replace the module aliases in the transpiled code,
     * because ts-node does not resolve them to relative require paths.
     *
     * 🚨 Note that only the first alias target will work
     * @example tsconfig.json
     * {
     *   "baseUrl": "src",
     *   "paths": {
     *     "@alias/*": ["target/*"]
     *   }
     * }
     */
    const aliases = Object.keys(tsConfig.paths).reduce((acc, tsAlias) => {
      // target/* -> target/
      const firstTarget = tsConfig.paths[tsAlias][0].replace(/\*$/, "")
      // @alias/* -> @alias
      const jsAlias = tsAlias.replace(/\/\*$/, "")
      // @alias = baseUrl/target/
      acc[jsAlias] = path.join(tsConfig.absoluteBaseUrl, firstTarget)
      return acc
    }, {})
    moduleAlias.addAliases(aliases)
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

    return importTheme(absoluteThemePath)
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

  if (!themeFile) {
    throw new Error("No path to theme file provided.")
  }

  const theme = await readTheme(themeFile)

  if (!isObject(theme)) {
    throw new Error("Theme not found in default or named `theme` export")
  }

  const template = await createThemeTypingsInterface(theme, {
    config: themeKeyConfiguration,
    strictComponentTypes,
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
