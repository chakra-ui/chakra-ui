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

/**
 * Root directory where all transforms live
 * ../transforms/
 *   ├─ components/
 *   ├─ props/
 *   └─ theme/
 */
const TRANSFORM_ROOT = path.join(__dirname, "../transforms")

/**
 * Subdirectories that contain transforms
 */
const TRANSFORM_DIRS = ["components", "props", "theme"]

/**
 * Convert "rename-boolean-props" → "Rename Boolean Props"
 */
function toTitle(input: string) {
  return input.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Auto-discovered transform registry
 */
export const transforms: Record<string, TransformInfo> = {}

for (const dir of TRANSFORM_DIRS) {
  const fullDir = path.join(TRANSFORM_ROOT, dir)

  if (!fs.existsSync(fullDir)) continue

  const files = fs.readdirSync(fullDir).filter((file) => file.endsWith(".ts"))

  for (const file of files) {
    const name = file.replace(/\.ts$/, "")
    const transformPath = path.join(fullDir, file)

    transforms[name] = {
      name,
      description:
        dir === "components"
          ? `Transform ${toTitle(name)} component`
          : `Transform ${toTitle(name)}`,
      path: transformPath,
    }
  }
}

/**
 * List of transforms used for upgrades
 * Automatically kept in sync with the filesystem
 */
export const upgradeTransforms = Object.keys(transforms)
