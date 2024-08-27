import { globbySync } from "globby"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

const localePath = path[process.platform === `win32` ? `win32` : `posix`]

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
}

function getFramework(files: string[], cwd: string) {
  if (files.find((file) => file.startsWith("next.config"))) {
    return "next"
  }

  if (files.find((file) => file.startsWith("vite.config"))) {
    const viteConfig = readFileSync(
      localePath.resolve(cwd, "vite.config.js"),
      "utf-8",
    )
    const isRemix = viteConfig.includes("@remix-run/dev")
    return isRemix ? "remix" : "vite"
  }

  return null
}

function getComponentsDir(scope: ProjectScope, cwd: string) {
  const basePath = localePath.join("components", "ui")

  if (scope.framework === "remix") {
    return localePath.join("app", basePath)
  }

  if (scope.framework === "next") {
    const isSrcDir = existsSync(localePath.join(cwd, "src"))
    return localePath.join(isSrcDir ? "src" : "", basePath)
  }

  return localePath.join("src", basePath)
}

export async function getProjectContext(opts: ProjectContextOptions) {
  const { cwd = process.cwd() } = opts
  const isTypeScript = existsSync(localePath.resolve(cwd, "tsconfig.json"))

  const scope: ProjectScope = {
    framework: "next",
    componentsDir: localePath.join("src", "components", "ui"),
  }

  const files = globbySync(["next.config.*", "vite.config.*"], { cwd })

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
