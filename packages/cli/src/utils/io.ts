import type { SystemContext } from "@chakra-ui/react"
import { log } from "@clack/prompts"
import chokidar from "chokidar"
import createDebug from "debug"
import { build } from "esbuild"
import { existsSync, mkdirSync, realpathSync, rm } from "node:fs"
import { writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { dirname, extname, join, resolve } from "node:path"
import vm from "node:vm"
import { resolveTsconfig } from "./resolve-tsconfig"

const debug = createDebug("chakra:io")
const require = createRequire(import.meta.url)

interface ReadResult {
  mod: SystemContext
  dependencies: string[]
}

interface ReadOptions {
  cwd?: string
  tsconfig?: string
}

async function bundleFile(
  file: string,
  cwd: string,
  tsconfigPath?: string,
): Promise<{ code: string; dependencies: string[] }> {
  const tsconfig = await resolveTsconfig(file, tsconfigPath)
  debug("resolved tsconfig for esbuild:", tsconfig)

  const result = await build({
    platform: "node",
    format: "cjs",
    mainFields: ["module", "main"],
    absWorkingDir: cwd,
    entryPoints: [file],
    outfile: "out.js",
    write: false,
    bundle: true,
    sourcemap: false,
    metafile: true,
    ...(tsconfig ? { tsconfig } : {}),
  })

  const { text } = result.outputFiles[0]
  return {
    code: text,
    dependencies: result.metafile ? Object.keys(result.metafile.inputs) : [],
  }
}

function loadBundledCode(file: string, code: string): any {
  try {
    return loadViaRequire(file, code)
  } catch {
    return loadViaVm(code)
  }
}

function loadViaRequire(file: string, code: string): any {
  const ext = extname(file)
  const realFileName = realpathSync.native(file)
  const defaultLoader = require.extensions[ext]

  require.extensions[ext] = (mod: any, filename: string) => {
    if (filename === realFileName) {
      mod._compile(code, filename)
    } else {
      defaultLoader?.(mod, filename)
    }
  }

  try {
    delete require.cache[require.resolve(file)]
    return require(file)
  } finally {
    require.extensions[ext] = defaultLoader
  }
}

function loadViaVm(code: string): any {
  const mod = { exports: {} }
  const ctx = vm.createContext({
    module: mod,
    exports: mod.exports,
    require,
  })
  vm.runInContext(code, ctx)
  return mod.exports
}

const systemExports = ["default", "preset", "system"] as const

const isRecord = (mod: unknown): mod is Record<string, unknown> => {
  return typeof mod === "object" && mod !== null
}

const isValidSystem = (mod: unknown): mod is SystemContext => {
  return isRecord(mod) && Object.hasOwnProperty.call(mod, "$$chakra")
}

function resolveSystemExport(mod: unknown) {
  const candidate = isRecord(mod) && mod.default != null ? mod.default : mod

  if (!isRecord(candidate) || isValidSystem(candidate)) return candidate

  const exports = candidate as Record<string, unknown>
  return exports.default || exports.preset || exports.system || candidate
}

function formatExportName(name: string) {
  return `"${name}"`
}

function getExportNames(mod: unknown) {
  if (!isRecord(mod) || isValidSystem(mod)) return []
  return Object.keys(mod).filter((name) => name !== "__esModule")
}

function formatInvalidSystemError(file: string, mod: unknown) {
  const exportNames = getExportNames(mod)
  const foundExports = exportNames.length
    ? `Found export${exportNames.length === 1 ? "" : "s"}: ${exportNames
        .map(formatExportName)
        .join(", ")}.`
    : "Found no named exports."

  return [
    `No Chakra system export found in ${file}.`,
    `The chakra typegen command expects ${systemExports
      .map(formatExportName)
      .join(
        ", ",
      )}, or a CommonJS export to be a Chakra system created with createSystem(...).`,
    foundExports,
    "If this file exports a config from defineConfig(...), wrap it first: export default createSystem(defaultConfig, config).",
  ].join(" ")
}

export const read = async (
  file: string,
  options: ReadOptions = {},
): Promise<ReadResult> => {
  const { cwd = process.cwd(), tsconfig } = options
  const filePath = resolve(file)

  const bundle = await bundleFile(filePath, cwd, tsconfig)
  const mod = loadBundledCode(filePath, bundle.code)
  const resolvedMod = resolveSystemExport(mod)

  if (!isValidSystem(resolvedMod)) {
    throw new Error(formatInvalidSystemError(file, mod))
  }

  return { mod: resolvedMod, dependencies: bundle.dependencies }
}

const outPath = (path: string, file: string) => {
  const ext = process.env.LOCAL ? "ts" : "d.ts"
  return join(path, `${file}.${ext}`)
}

export function ensureDir(dirPath: string): void {
  if (existsSync(dirPath)) return
  ensureDir(dirname(dirPath))
  mkdirSync(dirPath)
}

export const write = async (
  path: string,
  file: string,
  content: Promise<string>,
) => {
  try {
    await writeFile(outPath(path, file), await content)
  } catch (error) {
    throw new Error(
      `Failed to write file ${outPath(path, file)}: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

export function watch(paths: string[], cb: () => Promise<void>) {
  const watcher = chokidar.watch(paths, { ignoreInitial: true })

  watcher.on("ready", cb).on("change", async (filePath) => {
    log.info(`📦 File changed: ${filePath}`)
    return cb()
  })

  process.once("SIGINT", () => watcher.close())
  process.once("SIGTERM", () => watcher.close())
}

export async function clean(basePath: string) {
  log.info("🧹 Cleaning output directory")
  rm(basePath, { recursive: true }, (err) => {
    if (err) {
      log.error(err.message)
    }
  })
}
