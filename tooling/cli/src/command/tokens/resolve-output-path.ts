import fs from "fs"
import path from "path"
import { promisify } from "util"

const exists = promisify(fs.exists)

export const themeInterfaceDestination = [
  "node_modules",
  "@chakra-ui",
  "styled-system",
  "dist",
  "types",
  "theming.types.d.ts",
]

async function resolveThemingDefinitionPath(): Promise<string | undefined> {
  const cwd = process.cwd()

  const pathsToTry = [
    path.resolve("..", "..", ...themeInterfaceDestination),
    path.resolve("..", ...themeInterfaceDestination),
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

export async function resolveOutputPath(overridePath: string): Promise<string> {
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
