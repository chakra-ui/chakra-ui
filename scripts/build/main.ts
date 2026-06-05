import { readFileSync } from "fs"
import { resolve } from "path"
import { buildProject } from "./build.js"

async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packageJson = JSON.parse(
    readFileSync(resolve(cwd, "package.json"), "utf8"),
  )

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
