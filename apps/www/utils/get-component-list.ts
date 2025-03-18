import { findUpSync } from "find-up"
import { readdir } from "fs/promises"
import { dirname, extname, resolve } from "path/posix"

const isFileType = (file: string) => extname(file).startsWith(".ts")

export const getComponentDir = () => {
  const rootPath = findUpSync("pnpm-workspace.yaml")
  if (!rootPath) throw new Error("Not found")
  return resolve(dirname(rootPath), "packages", "react", "src", "components")
}

export const getComponentList = async () => {
  const componentDir = getComponentDir()
  const dirs = await readdir(componentDir, { withFileTypes: false })
  return dirs.filter((v) => !isFileType(v))
}

export const staticComponentList = [
  "aspect-ratio",
  "bleed",
  "box",
  "center",
  "container",
  "flex",
  "float",
  "grid",
  "group",
  "highlight",
  "portal",
  "for",
  "client-only",
  "show",
  "checkmark",
  "radiomark",
]
