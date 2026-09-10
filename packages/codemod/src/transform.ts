import type { Project, SourceFile } from "ts-morph"

export interface Diagnostic {
  level: "warn" | "error"
  file: string
  line?: number
  message: string
  action?: string
}

export interface TransformContext {
  project: Project
  filePath: string
  /** When true, transforms must not perform side effects (installs, shell). */
  dry?: boolean
  /** Push a diagnostic to surface in the migration report. */
  report(diagnostic: Omit<Diagnostic, "file"> & { file?: string }): void
}

/**
 * A codemod transform. Mutates `sourceFile` (and, for cross-file transforms,
 * sibling source files reached through `ctx.project`) in place. The runner is
 * responsible for saving and formatting.
 */
export type Transform = (sourceFile: SourceFile, ctx: TransformContext) => void
