import type { SystemContext } from "@chakra-ui/react"
import { log } from "@clack/prompts"
import { bundleNRequire } from "bundle-n-require"
import chokidar from "chokidar"
import { existsSync, mkdirSync, rm } from "node:fs"
import { writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"

interface ReadResult {
  mod: SystemContext
  dependencies: string[]
}

const isValidSystemContext = (mod: any): mod is SystemContext => {
  return Reflect.get(mod, "$$typeof") === "SystemContext"
}

export const read = async (file: string): Promise<ReadResult> => {
  const filePath = resolve(file)
  const { mod, dependencies } = await bundleNRequire(filePath)

  const resolvedMod = mod.default || mod.preset || mod.system || mod

  if (!isValidSystemContext(resolvedMod)) {
    throw new Error(
      `No default export found in ${file}. Did you forget to provide an export default?`,
    )
  }

  return { mod: resolvedMod, dependencies }
}

const getBasePath = () => {
  if (!process.env.LOCAL) {
    const root = require.resolve("@chakra-ui/react")
    return join(dirname(root), "dist", "styled-system", "generated")
  }

  const root = join(process.cwd(), "packages", "react", "src")
  return join(root, "styled-system", "generated")
}

export const basePath = getBasePath()

const outPath = (file: string) => {
  const ext = process.env.LOCAL ? "ts" : "d.ts"
  return join(basePath, `${file}.${ext}`)
}

export function ensureDir(dirPath: string): void {
  if (existsSync(dirPath)) return
  ensureDir(dirname(dirPath))
  mkdirSync(dirPath)
}

export const write = async (file: string, content: Promise<string>) => {
  try {
    await writeFile(outPath(file), await content)
  } catch (error) {
    console.log(error)
  }
}

export function watch(paths: string[], cb: () => Promise<void>) {
  const watcher = chokidar.watch(paths, { ignoreInitial: true })
  watcher.on("ready", cb).on("change", async (filePath) => {
    log.info(`📦 File changed: ${filePath}`)
    return cb()
  })
}

export async function clean() {
  log.info("🧹 Cleaning output directory")
  rm(basePath, { recursive: true }, (err) => {
    if (err) {
      log.error(err.message)
    }
  })
}
