import consola from "consola"
import { findUpSync } from "find-up"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { kebabCase, pascalCase } from "scule"
import {
  getComponentList,
  staticComponentList,
} from "../../utils/get-component-list"
import { uniq } from "../../utils/shared"

export const getRootPath = () => {
  const rootPath = findUpSync("pnpm-workspace.yaml")
  if (!rootPath) throw new Error("Not found")
  return dirname(rootPath)
}

export const main = async () => {
  const componentList = await getComponentList()

  const rootPath = getRootPath()
  const dirs = Array.from(new Set([...componentList, ...staticComponentList]))

  ensureDirSync("public/types/component")

  consola.box(`Generating list of ${dirs.length} components`)

  const mcpIndexPath = resolve(rootPath, "apps", "mcp", "src", "components.ts")

  await Promise.all([
    await writeFile(
      "public/types/component/index.json",
      JSON.stringify(dirs, null, 2),
    ),
    await writeFile(
      mcpIndexPath,
      `export const componentList = ${JSON.stringify(dirs, null, 2)} as [string, ...string[]];`,
    ),
  ])

  consola.success("Done ✅")
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
