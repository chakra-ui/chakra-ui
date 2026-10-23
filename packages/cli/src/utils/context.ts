import { lookItUpSync } from "look-it-up"
import { existsSync, globSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

export interface ProjectScope {
  framework: "next" | "remix" | "vite" | null
  componentsDir: string
}

export interface ProjectContext {
  isTypeScript: boolean
  cwd: string
  scope: ProjectScope
}

export interface ProjectContextOptions {
  cwd?: string
  tsx?: boolean
}

/**
 * Files in `cwd` matching `patterns`, in pattern order (sorted within each
 * pattern). Directories and broken symlinks are skipped.
 */
function findFiles(patterns: string[], cwd: string) {
  return patterns.flatMap((pattern) =>
    globSync(pattern, { cwd })
      .sort()
      .filter((file) =>
        statSync(join(cwd, file), { throwIfNoEntry: false })?.isFile(),
      ),
  )
}

function getFramework(files: string[], cwd: string) {
  if (files.find((file) => file.startsWith("next.config"))) {
    return "next"
  }

  if (files.find((file) => file.startsWith("vite.config"))) {
    const [viteConfigPath] = findFiles(
      [
        "vite.config.ts",
        "vite.config.js",
        "vite.config.mjs",
        "vite.config.mts",
      ],
      cwd,
    )
    const viteConfig = readFileSync(viteConfigPath, "utf-8")
    const isRemix =
      !!viteConfig?.includes("@remix-run/dev") ||
      !!viteConfig?.includes("@react-router/dev/vite")
    return isRemix ? "remix" : "vite"
  }

  return null
}

function getComponentsDir(scope: ProjectScope, cwd: string) {
  const basePath = join("components", "ui")

  if (scope.framework === "remix") {
    return join("app", basePath)
  }

  if (scope.framework === "next") {
    const isSrcDir = existsSync(join(cwd, "src"))
    return join(isSrcDir ? "src" : "", basePath)
  }

  return join("src", basePath)
}

export async function getProjectContext(opts: ProjectContextOptions) {
  const { cwd = process.cwd(), tsx } = opts

  const isTypeScript = tsx != null ? tsx : !!lookItUpSync("tsconfig.json", cwd)

  const scope: ProjectScope = {
    framework: "next",
    componentsDir: join("src", "components", "ui"),
  }

  const files = findFiles(["next.config.*", "vite.config.*"], cwd)

  if (files.length > 0) {
    scope.framework = getFramework(files, cwd)

    if (scope.framework) {
      scope.componentsDir = getComponentsDir(scope, cwd)
    }
  }

  return {
    isTypeScript,
    cwd,
    scope,
  }
}
