import { Alias } from "@rollup/plugin-alias"
import { Project } from "find-packages"
import { rmSync } from "fs"
import { join } from "path/posix"
import * as rollup from "rollup"
import { getConfig } from "./config.js"
import { prepareProject } from "./prepare.js"
import { generateTypes } from "./tsc.js"

interface BuildOptions {
  watch?: boolean
  clean?: boolean
  dts?: boolean
  prod?: boolean
  aliases?: Alias[]
}

const ignoreDirs = /utilities|hooks|components/

export async function buildProject(
  project: Project,
  options: BuildOptions = {},
) {
  const { watch, clean, dts, prod, aliases = [] } = options

  const { name } = project.manifest

  console.log(`[${name}] Building...`)

  if (clean) {
    //
    const distDir = join(project.dir, "dist")
    rmSync(distDir, { recursive: true, force: true })
  }

  const config = await getConfig(project, aliases)

  // if (!project.manifest.bin) {
  //   await prepareProject(project, !prod && ignoreDirs.test(project.dir))
  // }

  if (watch) {
    //
    config.watch = {
      include: config.input as string[],
      chokidar: { ignoreInitial: true },
    }

    const watcher = rollup.watch(config)
    console.log(`[${name}][JS] Watching source files...`)

    watcher.on("change", async () => {
      await prepareProject(project, !prod)
      console.log(`[${name}][JS] Source files changed, rebuilding...`)
    })

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
