import { SystemContext } from "@chakra-ui/react"
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

export const read = async (file: string): Promise<ReadResult> => {
  const filePath = resolve(file)
  const { mod, dependencies } = await bundleNRequire(filePath)
  return { mod: mod.default || mod.theme || mod, dependencies }
}

export const basePath = join(
  process.cwd(),
  "packages",
  "components",
  "src",
  "styled-system-new",
  "_generated",
)

export function ensureDir(dirPath: string): void {
  if (existsSync(dirPath)) return
  ensureDir(dirname(dirPath))
  mkdirSync(dirPath)
}

export const write = async (file: string, content: Promise<string>) => {
  try {
    await writeFile(join(basePath, file), await content)
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
