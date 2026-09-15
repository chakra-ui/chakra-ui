import fs from "fs"
import path from "path"

const IGNORE_DIRS = new Set([
  "node_modules",
  "dist",
  "build",
  "out",
  "coverage",
])

export async function isPackageUsed(
  pkgName: string,
  targetPath: string,
): Promise<boolean> {
  const files = fs.readdirSync(targetPath, { withFileTypes: true })
  for (const file of files) {
    const fullPath = path.join(targetPath, file.name)
    if (file.isDirectory()) {
      if (IGNORE_DIRS.has(file.name) || file.name.startsWith(".")) continue
      if (await isPackageUsed(pkgName, fullPath)) return true
    } else if (file.isFile() && /\.(ts|tsx|js|jsx)$/.test(file.name)) {
      const content = fs.readFileSync(fullPath, "utf8")
      const regex = new RegExp(
        `from\\s+['"]${pkgName}['"]|require\\(['"]${pkgName}['"]\\)`,
      )
      if (regex.test(content)) return true
    }
  }
  return false
}
