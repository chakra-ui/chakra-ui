import fs from "fs"
import path from "path"

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun"

export function getPackageManager(): PackageManager {
  if (fs.existsSync(path.join(process.cwd(), "pnpm-lock.yaml"))) {
    return "pnpm"
  }

  if (fs.existsSync(path.join(process.cwd(), "yarn.lock"))) {
    return "yarn"
  }

  if (fs.existsSync(path.join(process.cwd(), "bun.lockb"))) {
    return "bun"
  }

  if (fs.existsSync(path.join(process.cwd(), "package-lock.json"))) {
    return "npm"
  }

  const userAgent = process.env.npm_config_user_agent

  if (userAgent) {
    if (userAgent.startsWith("pnpm")) return "pnpm"
    if (userAgent.startsWith("yarn")) return "yarn"
    if (userAgent.startsWith("bun")) return "bun"
  }

  // Default to npm
  return "npm"
}
