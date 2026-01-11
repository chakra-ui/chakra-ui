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
const TRANSFORM_DIRS = ["removed", "theme", "props", "components", "types"]

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

  const files = fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"))

  for (const file of files) {
    const name = file.replace(/\.(js|ts)$/, "")
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

export const upgradeTransforms = Object.entries(transforms)
  .map(([name, info]) => ({ name, info }))
  .sort((a, b) => {
    const getDirIndex = (info: TransformInfo) => {
      const dir = TRANSFORM_DIRS.find((d) => info.path.includes(`/${d}/`))
      return dir ? TRANSFORM_DIRS.indexOf(dir) : 99
    }
    const idxA = getDirIndex(a.info)
    const idxB = getDirIndex(b.info)
    if (idxA !== idxB) return idxA - idxB
    return a.name.localeCompare(b.name)
  })
  .map((x) => x.name)
