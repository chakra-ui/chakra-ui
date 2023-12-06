import { findPackages } from "find-packages"
import { rmSync } from "fs"
import { join } from "path/posix"
import * as rollup from "rollup"
import { getConfig } from "./config"
import { generateTypes } from "./tsc"

interface BuildOptions {
  watch?: boolean
  clean?: boolean
  dts?: boolean
}

export async function buildPackages(options: BuildOptions = {}) {
  const { watch, clean, dts } = options

  const [pkg] = await findPackages("packages/components")

  if (clean) {
    //
    const distDir = join(pkg.dir, "dist")
    rmSync(distDir, { recursive: true, force: true })
  }

  const config = await getConfig(pkg)

  if (dts) {
    generateTypes(pkg)
  }

  if (watch) {
    //
    config.watch = {
      include: ["packages/components/src/**"],
      exclude: ["node_modules/**"],
    }

    rollup.watch(config)
    console.log("Watching source files...")
    //
  } else {
    //
    const build = await rollup.rollup(config)

    const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
      ? config.output
      : [config.output!]

    return Promise.all(outputs.map((output) => build.write(output)))
  }
}
