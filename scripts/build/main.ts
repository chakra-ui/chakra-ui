import { findPackages } from "find-packages"
import { buildProject } from "./build.js"

async function main() {
  const flags = process.argv.slice(2)

  const watch = flags.includes("--watch")
  const clean = flags.includes("--clean")
  const dts = flags.includes("--dts")

  const packages = await findPackages("packages", {
    ignore: ["packages/utilities", "packages/theme", "packages/theme-tools"],
  })

  const result = await Promise.allSettled(
    packages.map(async (pkg) => {
      await buildProject(pkg, { watch, clean, dts })
      return { name: pkg.manifest.name, dir: pkg.dir }
    }),
  )

  console.log(result)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
