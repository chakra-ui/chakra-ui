import * as p from "@clack/prompts"
import { EventEmitter } from "events"
import fs from "fs"
import { createRequire } from "node:module"
import path from "path"
import color from "picocolors"
import { transforms } from "./transforms.js"

const require = createRequire(import.meta.url)
const Runner = require("jscodeshift/src/Runner")

process.setMaxListeners(Infinity)
EventEmitter.defaultMaxListeners = 0

interface RunTransformOptions {
  dry?: boolean
  print?: boolean
  upgrade?: boolean
  ignorePattern?: string[]
}

export interface TransformResult {
  changed: number
  errors: number
  files: string[]
  errorFiles: string[]
}

const ANSI = /\x1b\[[0-9;]*m/g

function extractPaths(output: string, tag: "OKK" | "ERR"): string[] {
  const marker = ` ${tag} `
  return output
    .replace(ANSI, "")
    .split("\n")
    .filter((line) => line.includes(marker))
    .map((line) => line.slice(line.lastIndexOf(marker) + marker.length).trim())
    .filter(Boolean)
    .map((file) => path.relative(process.cwd(), file))
}

process.once("SIGINT", () => {
  p.cancel("Upgrade cancelled.")
  process.exit(0)
})

export async function runTransform(
  transformName: string,
  targetPath: string,
  options: RunTransformOptions = {},
): Promise<TransformResult> {
  const { dry = false, print = false, upgrade = false } = options
  const defaultIgnore = [
    "node_modules",
    ".git",
    ".next",
    ".turbo",
    "dist",
    "build",
    "out",
    "coverage",
  ]
  const ignorePattern = [
    ...new Set([...defaultIgnore, ...(options.ignorePattern || [])]),
  ]
  const transform = transforms[transformName]

  if (!transform)
    throw new Error(color.red(`Transform "${transformName}" not found.`))
  if (!fs.existsSync(targetPath))
    throw new Error(color.red(`Target path "${targetPath}" not found.`))

  let s: ReturnType<typeof p.spinner> | undefined
  if (!upgrade) {
    p.intro(color.bgCyan(color.black(" ✨ Chakra Codemod ")))
    p.note(
      `Preparing to run ${color.cyan(transformName)} on ${color.dim(targetPath)}`,
    )
    if (dry) p.log.info(color.yellow("[dry-run] No changes will be applied"))
    s = p.spinner()
    s.start(`Running codemod: ${transformName}`)
  }

  const capturing = !print
  const chunks: string[] = []
  const originalWrite = process.stdout.write.bind(process.stdout)
  if (capturing) {
    process.stdout.write = ((chunk: any) => {
      chunks.push(chunk.toString())
      return true
    }) as typeof process.stdout.write
  }

  try {
    const result = await Runner.run(transform.path, [targetPath], {
      extensions: "tsx,ts,jsx,js",
      parser: "tsx",
      runInBand: true,
      babel: true,
      silent: false,
      verbose: capturing ? 2 : 0,
      dry,
      print,
      ignorePattern,
    })

    const output = chunks.join("")
    if (capturing) process.stdout.write = originalWrite

    if (!upgrade && s) {
      s.stop(
        dry
          ? color.green("Dry run complete")
          : color.green("Transformations complete"),
      )
      p.outro(`${color.cyan("Done!")} Your theme/code has been migrated.`)
    }

    return {
      changed: result?.ok ?? 0,
      errors: result?.error ?? 0,
      files: capturing ? extractPaths(output, "OKK") : [],
      errorFiles: capturing ? extractPaths(output, "ERR") : [],
    }
  } catch (err) {
    if (capturing) process.stdout.write = originalWrite
    s?.stop(color.red("Transformation failed"))
    throw err instanceof Error ? err : new Error(String(err))
  }
}
