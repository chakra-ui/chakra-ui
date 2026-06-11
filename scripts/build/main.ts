import { buildProject } from "./build.js"
import { readPackageJson } from "./read-package-json.js"

async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packageJson = readPackageJson(cwd)

  await buildProject({
    dir: cwd,
    name: packageJson.name,
    watch,
    clean,
    dts,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
