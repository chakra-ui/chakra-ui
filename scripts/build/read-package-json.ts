import { readFileSync } from "node:fs"
import { join } from "node:path"

export function readPackageJson(dir: string) {
  return JSON.parse(readFileSync(join(dir, "package.json"), "utf8"))
}
