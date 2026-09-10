import { format } from "prettier"
import { Project, ts } from "ts-morph"
import type { Diagnostic, Transform, TransformContext } from "../src/transform"

export function createTestProject(): Project {
  return new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      allowJs: true,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ESNext,
    },
  })
}

async function formatOutput(source: string): Promise<string> {
  try {
    return await format(source, {
      parser: "typescript",
      semi: false,
      singleQuote: true,
      trailingComma: "all",
    })
  } catch {
    return source
  }
}

/**
 * Run a transform against a single in-memory file and return the formatted
 * output. String-in / string-out, matching the previous harness so existing
 * inline snapshots stay valid.
 */
export async function applyTransform(
  transform: Transform,
  source: string,
  filePath = "test.tsx",
): Promise<string> {
  const project = createTestProject()
  const sourceFile = project.createSourceFile(filePath, source, {
    overwrite: true,
  })
  const ctx: TransformContext = {
    project,
    filePath,
    dry: true,
    report() {},
  }
  transform(sourceFile, ctx)
  return formatOutput(sourceFile.getFullText())
}

/**
 * Run a transform against multiple in-memory files (for cross-file transforms).
 * Runs the transform on `entry`, then returns every file's formatted text keyed
 * by path.
 */
export async function applyTransformFiles(
  transform: Transform,
  files: Record<string, string>,
  entry: string,
): Promise<Record<string, string>> {
  const project = createTestProject()
  for (const [path, source] of Object.entries(files)) {
    project.createSourceFile(path, source, { overwrite: true })
  }
  const entryFile = project.getSourceFileOrThrow(entry)
  const diagnostics: Diagnostic[] = []
  const ctx: TransformContext = {
    project,
    filePath: entry,
    dry: true,
    report(d) {
      diagnostics.push({ ...d, file: d.file ?? entry })
    },
  }
  transform(entryFile, ctx)

  const out: Record<string, string> = {}
  for (const sf of project.getSourceFiles()) {
    out[sf.getFilePath().replace(/^\//, "")] = await formatOutput(
      sf.getFullText(),
    )
  }
  return out
}

/** Run a transform twice to verify idempotency. */
export async function applyTransformMultiple(
  transform: Transform,
  source: string,
  times = 2,
): Promise<string> {
  let result = source
  for (let i = 0; i < times; i++) {
    result = await applyTransform(transform, result)
  }
  return result
}
