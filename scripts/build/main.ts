import { findPackages } from "find-packages"
import { buildProject } from "./build.js"

async function main() {
  const flags = process.argv.slice(2)

  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packages = await findPackages("packages/styled-system")

  const buildPackages = async () => {
    for (const pkg of packages) {
      await buildProject(pkg, { watch, clean, dts })
    }
  }

  buildPackages()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
