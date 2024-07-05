import { findUpSync } from "find-up"
import { readdir } from "fs/promises"
import fetch from "node-fetch"
import { dirname, extname, resolve } from "path/posix"

const isFileType = (file: string) => extname(file).startsWith(".ts")

export const getArkComponentList = async () => {
  const prom = await fetch("http://ark-ui.com/api/types/react")
  const res = await prom.json()
  return res as string[]
}

export const getArkComponent = async (component: string) => {
  const prom = await fetch(`http://ark-ui.com/api/types/react/${component}`)
  const res = await prom.json()
  return res as Record<string, any>
}

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

const staticComponents = [
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
  "wrap",
  "for",
  "client-only",
  "show",
  "checkmark",
  "radiomark",
]

export const getStaticComponentList = () => {
  return staticComponents.slice()
}
