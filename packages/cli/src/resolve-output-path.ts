import fs from "node:fs"
import path from "node:path"
import { promisify } from "node:util"

const exists = promisify(fs.exists)

export const themeInterfaceDestination = [
  "node_modules",
  "@chakra-ui",
  "styled-system",
  "dist",
  "types",
  "theming.types.d.ts",
]

/**
 * Finds the target file to override
 * In our case it is located in the @chakra-ui/styled-system package
 */
async function resolveThemingDefinitionPath(): Promise<string | undefined> {
  const baseDir = path.join("..", "..", "..")
  const cwd = process.cwd()

  const pathsToTry = [
    path.resolve(baseDir, "..", ...themeInterfaceDestination),
    path.resolve(baseDir, "..", "..", ...themeInterfaceDestination),
    path.resolve(cwd, ...themeInterfaceDestination),
    path.resolve(cwd, "..", ...themeInterfaceDestination),
    path.resolve(cwd, "..", "..", ...themeInterfaceDestination),
  ]

  const triedPaths = await Promise.all(
    pathsToTry.map(async (possiblePath) => {
      if (await exists(possiblePath)) {
        return possiblePath
      }
      return ""
    }),
  )

  return triedPaths.find(Boolean)
}

/**
 * Find the location of the default target file or resolve the given path
 */
export async function resolveOutputPath(
  overridePath?: string,
): Promise<string> {
  if (overridePath) {
    return path.resolve(process.cwd(), overridePath)
  }

  const themingDefinitionFilePath = await resolveThemingDefinitionPath()
  if (!themingDefinitionFilePath) {
    throw new Error(
      "Could not find @chakra-ui/styled-system in node_modules. Please provide `--out` parameter.",
    )
  }

  return themingDefinitionFilePath
}
