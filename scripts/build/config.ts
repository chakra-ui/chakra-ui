import alias, { Alias } from "@rollup/plugin-alias"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import glob from "fast-glob"
import { resolve } from "node:path"
import { Plugin, RollupOptions } from "rollup"
import banner from "rollup-plugin-banner2"
import esbuild from "rollup-plugin-esbuild"

const useClientFileExclude = ["index"].reduce<string[]>((acc, name) => {
  acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`)
  return acc
}, [])

const useClientDirInclude = [
  "packages/hooks/src",
  "packages/react/src/components",
]

interface Options {
  dir: string
  aliases: Alias[]
}

export async function getConfig(options: Options): Promise<RollupOptions> {
  const { dir, aliases } = options

  const packageJson = await import(resolve(dir, "package.json"))

  const isCli = packageJson.bin !== undefined

  const plugins: Plugin[] = [
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    alias({ entries: aliases }),
    esbuild({
      sourceMap: true,
      tsconfig: resolve(dir, "tsconfig.json"),
      platform: isCli ? "node" : "browser",
    }),
    replace({ preventAssignment: true }),
    // banner((chunk) => {
    //   const skip =
    //     useClientFileExclude.includes(chunk.fileName) ||
    //     !useClientDirInclude.includes(dir)

    //   if (skip) return

    //   return "'use client';\n"
    // }),
    {
      name: "@rollup-plugin/remove-empty-chunks",
      generateBundle(_, bundle) {
        for (const [name, chunk] of Object.entries(bundle)) {
          if (chunk.type === "chunk" && chunk.code.length === 0) {
            delete bundle[name]
          }
        }
      },
    },
  ]

  const deps = [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]

  const external = new RegExp(`^(${deps.join("|")})`)

  const entries = await glob("src/**/*.{ts,tsx}")

  const outputs: RollupOptions["output"] = [
    {
      format: "es",
      entryFileNames: "[name].mjs",
      dir: resolve(dir, "dist/esm"),
      preserveModules: true,
    },
  ]

  if (!isCli) {
    outputs.push({
      format: "cjs",
      entryFileNames: "[name].cjs",
      dir: resolve(dir, "dist/cjs"),
      preserveModules: true,
    })
  }

  return {
    input: entries,
    onLog(level, log, handler) {
      if (log.code === "EMPTY_BUNDLE") return
      return handler(level, log)
    },
    output: outputs,
    external,
    plugins,
  }
}
