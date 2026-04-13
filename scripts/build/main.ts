import { existsSync } from "node:fs"
import { resolve } from "path/posix"
import { buildProject } from "./build.js"

async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packageJson = await import(resolve(cwd, "package.json"))

  const externalPatterns: (string | RegExp)[] = []

  // If the package has a styled-system directory (Panda CSS codegen output),
  // treat its imports as external so they stay as relative paths in dist/
  if (existsSync(resolve(cwd, "styled-system"))) {
    externalPatterns.push("styled-system")
  }

  await buildProject({
    dir: cwd,
    name: packageJson.name,
    watch,
    clean,
    dts,
    externalPatterns,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
