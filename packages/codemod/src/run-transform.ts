import * as p from "@clack/prompts"
import fs from "fs"
import path from "path"
import color from "picocolors"
import { format, resolveConfig } from "prettier"
import { Project } from "ts-morph"
import type { Diagnostic, Transform, TransformContext } from "./transform.js"
import { transforms } from "./transforms.js"
import { findCrossFileReExports } from "./utils/chakra-tracker.js"

interface RunTransformOptions {
  dry?: boolean
  print?: boolean
  upgrade?: boolean
  crossFile?: boolean
  ignorePattern?: string[]
}

export interface ReExportLocation {
  file: string
  name: string
  from: string
  line: number
}

export interface TransformResult {
  changed: number
  errors: number
  files: string[]
  errorFiles: string[]
  diagnostics: Diagnostic[]
  reExports: ReExportLocation[]
}

const DEFAULT_IGNORE = [
  "node_modules",
  ".git",
  ".next",
  ".turbo",
  "dist",
  "build",
  "out",
  "coverage",
]

function isIgnored(filePath: string, ignore: string[]): boolean {
  return ignore.some((pattern) => filePath.split(path.sep).includes(pattern))
}

async function formatSource(filePath: string, source: string): Promise<string> {
  try {
    const config = await resolveConfig(filePath)
    return await format(source, { ...config, filepath: filePath })
  } catch {
    return source
  }
}

async function loadTransform(transformPath: string): Promise<Transform> {
  const mod = await import(transformPath)
  return mod.default as Transform
}

export async function runTransform(
  transformName: string,
  targetPath: string,
  options: RunTransformOptions = {},
): Promise<TransformResult> {
  const { dry = false, upgrade = false, crossFile = false } = options
  const ignore = [
    ...new Set([...DEFAULT_IGNORE, ...(options.ignorePattern || [])]),
  ]

  const info = transforms[transformName]
  if (!info)
    throw new Error(color.red(`Transform "${transformName}" not found.`))
  if (!fs.existsSync(targetPath))
    throw new Error(color.red(`Target path "${targetPath}" not found.`))

  const transform = await loadTransform(info.path)

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

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: { allowJs: true },
  })

  const stat = fs.statSync(targetPath)
  if (stat.isDirectory()) {
    project.addSourceFilesAtPaths(path.join(targetPath, "**/*.{ts,tsx,js,jsx}"))
  } else {
    project.addSourceFileAtPath(targetPath)
  }

  const errorFiles: string[] = []
  const diagnostics: Diagnostic[] = []
  const reExports: ReExportLocation[] = []

  for (const sourceFile of project.getSourceFiles()) {
    const filePath = sourceFile.getFilePath()
    if (isIgnored(filePath, ignore)) continue

    if (crossFile) {
      const rel = path.relative(process.cwd(), filePath)
      for (const r of findCrossFileReExports(sourceFile)) {
        reExports.push({ file: rel, ...r })
      }
    }

    try {
      const ctx: TransformContext = {
        project,
        filePath,
        dry,
        crossFile,
        report(d) {
          diagnostics.push({ ...d, file: d.file ?? filePath })
        },
      }
      transform(sourceFile, ctx)
    } catch (err) {
      errorFiles.push(path.relative(process.cwd(), filePath))
    }
  }

  const errorSet = new Set(errorFiles)
  const changed = project
    .getSourceFiles()
    .filter((sf) => !sf.isSaved() && !isIgnored(sf.getFilePath(), ignore))
    .map((sf) => path.relative(process.cwd(), sf.getFilePath()))
    .filter((rel) => !errorSet.has(rel))

  if (!dry) {
    await saveChanged(project, changed)
  }

  if (!upgrade && s) {
    s.stop(
      dry
        ? color.green("Dry run complete")
        : color.green("Transformations complete"),
    )
    printReport(changed, errorFiles, diagnostics)
    printReExports(reExports)
    p.outro(`${color.cyan("Done!")} Your theme/code has been migrated.`)
  }

  return {
    changed: changed.length,
    errors: errorFiles.length,
    files: changed,
    errorFiles,
    diagnostics,
    reExports,
  }
}

function printReExports(reExports: ReExportLocation[]) {
  if (reExports.length === 0) return
  const body = reExports
    .map(
      (r) => `${r.file}:${r.line}  ${r.name}  ${color.dim(`(via ${r.from})`)}`,
    )
    .join("\n")
  p.note(body, `Cross-file re-exports resolved (${reExports.length})`)
}

async function saveChanged(project: Project, changed: string[]) {
  const changedSet = new Set(changed)
  for (const sourceFile of project.getSourceFiles()) {
    const rel = path.relative(process.cwd(), sourceFile.getFilePath())
    if (!changedSet.has(rel)) continue
    const formatted = await formatSource(
      sourceFile.getFilePath(),
      sourceFile.getFullText(),
    )
    fs.writeFileSync(sourceFile.getFilePath(), formatted)
  }
}

function printReport(
  changed: string[],
  errorFiles: string[],
  diagnostics: Diagnostic[],
) {
  if (changed.length) {
    p.log.success(`${changed.length} file(s) changed`)
  } else {
    p.log.info("No files changed")
  }
  if (errorFiles.length) {
    p.log.error(
      `${errorFiles.length} file(s) errored:\n${errorFiles.join("\n")}`,
    )
  }
  const warnings = diagnostics.filter((d) => d.level !== "error")
  if (warnings.length) {
    const lines = warnings.map(
      (d) =>
        `- ${path.relative(process.cwd(), d.file)}: ${d.message}${d.action ? `\n  → ${d.action}` : ""}`,
    )
    p.log.warn(`Manual follow-ups:\n${lines.join("\n")}`)
  }
}
