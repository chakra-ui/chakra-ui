import alias, { Alias } from "@rollup/plugin-alias"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import glob from "fast-glob"
import { resolve } from "node:path"
import { Plugin, RollupOptions } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import { preserveDirectives } from "rollup-plugin-preserve-directives"

interface Options {
  dir: string
  aliases: Alias[]
  externalPatterns?: (string | RegExp)[]
}

export async function getConfig(options: Options): Promise<RollupOptions> {
  const { dir, aliases, externalPatterns = [] } = options

  const packageJson = await import(resolve(dir, "package.json"))

  const isCli =
    packageJson.bin !== undefined || packageJson.name.includes("docgen")

  const plugins: Plugin[] = [
    nodeResolve({
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      preferBuiltins: true,
    }),
    commonjs(),
    alias({ entries: aliases }),
    esbuild({
      sourceMap: true,
      tsconfig: resolve(dir, "tsconfig.json"),
      platform: isCli ? "node" : "browser",
    }),
    replace({ preventAssignment: true }),
    preserveDirectives(),
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

  const depsRegex = deps.length ? new RegExp(`^(${deps.join("|")})`) : undefined

  const external = (id: string) => {
    if (depsRegex?.test(id)) return true
    for (const pattern of externalPatterns) {
      if (typeof pattern === "string" ? id.includes(pattern) : pattern.test(id))
        return true
    }
    return false
  }
  const entries = await glob("src/**/*.{ts,tsx}")

  const outputs: RollupOptions["output"] = [
    {
      format: "es",
      exports: "named",
      entryFileNames: "[name].js",
      dir: resolve(dir, "dist/esm"),
      preserveModules: true,
      strict: false,
    },
  ]

  if (!isCli) {
    outputs.push({
      format: "cjs",
      exports: "named",
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
    onwarn(warning, warn) {
      if (warning.code === "SOURCEMAP_ERROR") return
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
      warn(warning)
    },
    output: outputs,
    external,
    plugins,
  }
}
