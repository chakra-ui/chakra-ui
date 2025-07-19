import consola from "consola"
import { findUpSync } from "find-up"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"
import { dirname } from "node:path"
import {
  getComponentList,
  staticComponentList,
} from "../../utils/get-component-list"

export const getRootPath = () => {
  const rootPath = findUpSync("pnpm-workspace.yaml")
  if (!rootPath) throw new Error("Not found")
  return dirname(rootPath)
}

export const main = async () => {
  const componentList = await getComponentList()

  const dirs = Array.from(
    new Set([...componentList, ...staticComponentList]),
  ).filter((dir) => dir !== "typography")

  ensureDirSync("public/types/component")

  consola.box(`Generating list of ${dirs.length} components`)

  await writeFile(
    "public/types/component/index.json",
    JSON.stringify(dirs, null, 2),
  )

  consola.success("Done ✅")
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
