import { Project } from "find-packages"
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

export async function buildProject(
  project: Project,
  options: BuildOptions = {},
) {
  const { watch, clean, dts } = options

  const { name } = project.manifest

  if (clean) {
    //
    const distDir = join(project.dir, "dist")
    rmSync(distDir, { recursive: true, force: true })
  }

  const config = await getConfig(project)

  if (watch) {
    //
    config.watch = {
      include: [`${project.dir}/src/**`],
      exclude: ["node_modules/**"],
    }

    rollup.watch(config)
    console.log(`[${name}][JS] Watching source files...`)
    //
  } else {
    //
    const build = await rollup.rollup(config)

    const outputs: rollup.OutputOptions[] = Array.isArray(config.output)
      ? config.output
      : [config.output!]

    await Promise.all(outputs.map((output) => build.write(output)))
    console.log(`[${name}][JS] Generated CJS and ESM files ✅`)

    if (dts) {
      await generateTypes(project)
      console.log(`[${name}][DTS] Generated type definitions ✅`)
    }
  }
}
