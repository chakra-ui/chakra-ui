import alias, { Alias } from "@rollup/plugin-alias"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import glob from "fast-glob"
import { Project } from "find-packages"
import { resolve } from "node:path"
import { Plugin, RollupOptions } from "rollup"
import banner from "rollup-plugin-banner2"
import esbuild from "rollup-plugin-esbuild"

const useClientFileExclude = ["index"].reduce<string[]>((acc, name) => {
  acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`)
  return acc
}, [])

const useClientDirInclude = [
  "packages/hooks",
  "packages/components",
  "packages/system",
  "packages/color-mode",
]

export async function getConfig(
  project: Project,
  aliases: Alias[],
): Promise<RollupOptions> {
  const { manifest, dir } = project

  const plugins: Plugin[] = [
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    alias({ entries: aliases }),
    esbuild({
      sourceMap: true,
      tsconfig: resolve(dir, "tsconfig.json"),
      platform: manifest.bin ? "node" : "browser",
    }),
    replace({ preventAssignment: true }),
    banner((chunk) => {
      const skip =
        useClientFileExclude.includes(chunk.fileName) ||
        !useClientDirInclude.includes(dir)

      if (skip) return

      return "'use client';\n"
    }),
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
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
    "react/jsx-runtime",
    "next/image",
  ]

  const external = new RegExp(`^(${deps.join("|")})`)

  const entries = await glob("src/**/*.{ts,tsx}", {
    cwd: project.dir,
    absolute: true,
    ignore: [
      "**/*.d.ts",
      "**/*.test.{ts,tsx}",
      "**/*.stories.tsx",
      "**/*.fixture.{ts,tsx}",
    ],
  })

  return {
    input: entries,
    onLog(level, log, handler) {
      if (log.code === "EMPTY_BUNDLE") return
      return handler(level, log)
    },
    output: [
      {
        format: "es",
        entryFileNames: "[name].mjs",
        dir: resolve(dir, "dist/esm"),
        preserveModules: true,
      },
      {
        format: "cjs",
        entryFileNames: "[name].cjs",
        dir: resolve(dir, "dist/cjs"),
        preserveModules: true,
      },
    ],
    external,
    plugins,
  }
}
