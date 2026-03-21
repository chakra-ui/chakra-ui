import fs from "fs"
import path from "path"

export interface ProjectScope {
  framework: "next" | "remix" | "vite" | null
  componentsDir: string
}

function getFramework(files: string[], cwd: string) {
  if (files.find((file) => file.startsWith("next.config"))) {
    return "next"
  }

  if (files.find((file) => file.startsWith("vite.config"))) {
    const viteConfigPath = files.find((file) => file.startsWith("vite.config"))!
    const viteConfig = fs.readFileSync(path.join(cwd, viteConfigPath), "utf-8")
    const isRemix =
      !!viteConfig?.includes("@remix-run/dev") ||
      !!viteConfig?.includes("@react-router/dev/vite")
    return isRemix ? "remix" : "vite"
  }

  return null
}

function getComponentsDir(scope: ProjectScope, cwd: string) {
  const basePath = path.join("components", "ui")

  if (scope.framework === "remix") {
    return path.join("app", basePath)
  }

  if (scope.framework === "next") {
    const isSrcDir = fs.existsSync(path.join(cwd, "src"))
    return path.join(isSrcDir ? "src" : "", basePath)
  }

  return path.join("src", basePath)
}

export function getProjectInfo(cwd: string = process.cwd()) {
  const files = fs.readdirSync(cwd)

  const scope: ProjectScope = {
    framework: "next",
    componentsDir: path.join("src", "components", "ui"),
  }

  const configFiles = files.filter(
    (file) =>
      file.startsWith("next.config") ||
      file.startsWith("vite.config") ||
      file.startsWith("tsconfig.json") ||
      file.startsWith("jsconfig.json"),
  )

  if (configFiles.length > 0) {
    scope.framework = getFramework(configFiles, cwd)

    if (scope.framework) {
      scope.componentsDir = getComponentsDir(scope, cwd)
    }
  }

  return scope
}
