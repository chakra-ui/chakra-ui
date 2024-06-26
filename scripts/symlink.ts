import { findPackages } from "find-packages"
import { findUpSync } from "find-up"
import { spawnSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const packageJsonPath = resolve("package.json")
const { log, info } = console

function readPkgJson() {
  return JSON.parse(readFileSync(packageJsonPath!, "utf-8"))
}

async function getZagPackages(): Promise<Record<string, string>> {
  const dir = findUpSync("zag", { type: "directory" })
  if (!dir) throw new ReferenceError("zag directory not found")

  const packages = await findPackages(dir, {
    includeRoot: false,
    patterns: ["packages/**/*", "shared/*"],
  })

  const result: Record<string, string> = {}

  for (const { manifest, dir } of packages) {
    if (!manifest.name) continue
    result[manifest.name] = resolve(dir)
  }

  return result
}

async function main() {
  log("packageJsonPath", packageJsonPath)

  const overrides = await getZagPackages()

  const revert = process.argv.includes("--revert")

  const packageJson = readPkgJson()

  if (revert) {
    info("reverting local sync...")
    if (!packageJson.pnpm?.overrides) {
      info("no overrides found. exiting...")
      return
    }

    for (const key of Object.keys(overrides)) {
      delete packageJson.pnpm.overrides[key]
    }

    if (Object.keys(packageJson.pnpm.overrides).length === 0) {
      delete packageJson.pnpm.overrides
    }

    if (Object.keys(packageJson.pnpm).length === 0) {
      delete packageJson.pnpm
    }

    info("reverted ", Object.keys(overrides).length, "zag packages")

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    log("package.json updated ✅")

    //
  } else {
    info("syncing local packages...")

    packageJson.pnpm ||= {}
    packageJson.pnpm.overrides ||= {}
    Object.assign(packageJson.pnpm.overrides, overrides)

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    log("package.json updated ✅")
  }

  info("installing packages...")
  spawnSync("pnpm", ["install"], { stdio: "inherit" })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
