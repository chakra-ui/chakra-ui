import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface TransformInfo {
  name: string
  description: string
  path: string
}

const TRANSFORM_ROOT = path.join(__dirname, "transforms")
const TRANSFORM_DIRS = ["theme", "props", "components", "removed", "types"]

function toTitle(input: string) {
  const items = input.split("_")

  return items
    .map((item) => {
      // Capitalize each dash-separated part
      return item
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("")
    })
    .join(", ")
}

/**
 * Auto-discovered transform registry
 */
export const transforms: Record<string, TransformInfo> = {}

for (const dir of TRANSFORM_DIRS) {
  const fullDir = path.join(TRANSFORM_ROOT, dir)

  if (!fs.existsSync(fullDir)) {
    console.warn(`Transform directory not found: ${fullDir}`)
    continue
  }

  const files = fs.readdirSync(fullDir).filter((file) => file.endsWith(".js"))

  for (const file of files) {
    const name = file.replace(/\.js$/, "")
    const transformPath = path.join(fullDir, file)

    const title = toTitle(name)
    const hasMultiple = name.includes("_")

    transforms[name] = {
      name,
      description:
        dir === "components"
          ? `Transform ${title} ${hasMultiple ? "components" : "component"}`
          : `Transform ${title}`,
      path: transformPath,
    }
  }
}

/**
 * List of transforms used for upgrades
 * Automatically kept in sync with the filesystem
 */
const PRIORITY: Record<string, number> = {
  // theme/props first
  "gradient-props": 10,
  "color-palette": 10,
  "nested-styles": 10,
  "boolean-props": 10,
  "spacing-props": 10,
  "color-transform": 10,
  // structural early
  button: 20,
  divider: 20,
  "show-hide": 20,
  // components next (default 30)
  // removed last
  "circular-progress": 40,
}

function getPriority(name: string, dir: string) {
  if (PRIORITY[name] != null) return PRIORITY[name]
  if (dir === "theme" || dir === "props") return 10
  if (dir === "components") return 30
  if (dir === "removed") return 40
  return 50
}

export const upgradeTransforms = Object.entries(transforms)
  .map(([name, info]) => ({ name, info }))
  .sort((a, b) => {
    const dirA = a.info.path.includes("/theme/")
      ? "theme"
      : a.info.path.includes("/props/")
        ? "props"
        : a.info.path.includes("/components/")
          ? "components"
          : a.info.path.includes("/removed/")
            ? "removed"
            : "other"
    const dirB = b.info.path.includes("/theme/")
      ? "theme"
      : b.info.path.includes("/props/")
        ? "props"
        : b.info.path.includes("/components/")
          ? "components"
          : b.info.path.includes("/removed/")
            ? "removed"
            : "other"
    const pA = getPriority(a.name, dirA)
    const pB = getPriority(b.name, dirB)
    if (pA !== pB) return pA - pB
    return a.name.localeCompare(b.name)
  })
  .map((x) => x.name)
