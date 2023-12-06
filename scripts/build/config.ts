import { nodeResolve } from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import { Project } from "find-packages"
import path, { join, resolve } from "node:path"
import { RollupOptions } from "rollup"
import banner from "rollup-plugin-banner2"
import esbuild from "rollup-plugin-esbuild"

const useClientExclude = ["index.mjs", "index.js"]

export async function getConfig(project: Project): Promise<RollupOptions> {
  const { manifest, dir } = project

  const plugins = [
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
    esbuild({
      sourceMap: false,
      tsconfig: join(dir, "tsconfig.json"),
    }),
    replace({ preventAssignment: true }),
    banner((chunk) => {
      if (!useClientExclude.includes(chunk.fileName)) {
        return "'use client';\n"
      }
      return
    }),
  ]

  return {
    input: resolve(project.dir, "src", "index.ts"),
    output: [
      {
        format: "es",
        entryFileNames: "[name].mjs",
        dir: path.resolve(dir, "dist/esm"),
        preserveModules: true,
        sourcemap: true,
      },
      {
        format: "cjs",
        entryFileNames: "[name].cjs",
        dir: path.resolve(dir, "dist/cjs"),
        preserveModules: true,
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(manifest.dependencies ?? {}),
      ...Object.keys(manifest.peerDependencies ?? {}),
      "react/jsx-runtime",
    ],
    plugins,
  }
}
