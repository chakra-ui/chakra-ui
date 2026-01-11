import fs from "fs"
import path from "path"

export async function isPackageUsed(
  pkgName: string,
  targetPath: string,
): Promise<boolean> {
  const files = fs.readdirSync(targetPath, { withFileTypes: true })
  for (const file of files) {
    const fullPath = path.join(targetPath, file.name)
    if (file.isDirectory()) {
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
