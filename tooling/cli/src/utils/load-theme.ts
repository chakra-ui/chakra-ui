import { build } from "esbuild"
import path from "path"
import fs from "fs"
import { realpathSync } from "fs-extra"

export async function bundleConfigFile(
  fileName: string,
): Promise<{ code: string; dependencies: string[] }> {
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: "out.js",
    write: false,
    platform: "node",
    bundle: true,
    format: "cjs",
    sourcemap: false,
    metafile: true,
    mainFields: ["module", "main"],
  })

  const { text } = result.outputFiles[0]

  return {
    code: text,
    dependencies: result.metafile ? Object.keys(result.metafile.inputs) : [],
  }
}

function loadBundledFile(fileName: string, code: string): Promise<any> {
  const extension = path.extname(fileName)
  const realFileName = fs.realpathSync(fileName)

  const loader = require.extensions[extension]!

  require.extensions[extension] = (mod: any, filename: string) => {
    if (filename === realFileName) {
      mod._compile(code, filename)
    } else {
      loader(mod, filename)
    }
  }

  // clear cache in case of server restart
  delete require.cache[require.resolve(fileName)]

  const raw = require(fileName)
  const config = raw.default ?? raw.theme ?? raw

  require.extensions[extension] = loader

  return config
}

async function bundleRequire(filepath: string, cwd: string) {
  const filePath = require.resolve(filepath, { paths: [cwd] })

  let theme: Record<string, any> = {}
  let dependencies: string[]

  try {
    const realFileName = realpathSync(filePath)
    dependencies = [realFileName]

    delete require.cache[filePath]

    const mod = require(realFileName)
    theme = mod.default ?? mod
    //
  } catch {
    //
    const bundle = await bundleConfigFile(filePath)
    dependencies = bundle.dependencies

    try {
      theme = await loadBundledFile(filePath, bundle.code)
    } catch {}
  }

  return {
    theme,
    dependencies,
  }
}

export function loadTheme(path: string) {
  return bundleRequire(path, process.cwd())
}
