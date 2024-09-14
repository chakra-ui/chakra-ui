import { resolve } from "path/posix"
import { buildProject } from "./build.js"

async function main() {
  const cwd = process.cwd()
  const flags = process.argv.slice(2)
  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packageJson = await import(resolve(cwd, "package.json"))

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
