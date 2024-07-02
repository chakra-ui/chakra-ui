import { findUpSync } from "find-up"
import { readdir } from "fs/promises"
import type { NextRequest } from "next/server"
import { dirname, extname, resolve } from "path/posix"
import { camelCase } from "scule"

const isFileType = (file: string) => extname(file).startsWith(".ts")

export const GET = async (_req: NextRequest) => {
  const rootPath = findUpSync("pnpm-workspace.yaml")

  if (!rootPath) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  const componentPath = resolve(
    dirname(rootPath),
    "packages",
    "react",
    "src",
    "components",
  )

  const componentList = (await readdir(componentPath, { withFileTypes: false }))
    .filter((v) => !isFileType(v))
    .map(camelCase)

  return Response.json(componentList)
}
