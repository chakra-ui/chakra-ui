import react from "@vitejs/plugin-react"
import { builtinModules } from "module"
import { join } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const cwd = process.cwd()

const pkg = require(join(cwd, "package.json"))

const args = process.argv.slice(2)

const flags = {
  dts: args.includes("--dts"),
  dev: args.includes("--watch"),
}

const external = [
  ...builtinModules,
  "react/jsx-runtime",
  "@chakra-ui/storybook-addon",
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]

const defaultEntry = join(process.cwd(), "src", "index.ts")

// see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    flags.dts &&
      dts({
        skipDiagnostics: true,
        entryRoot: "src",
        staticImport: true,
      }),
    react({ jsxRuntime: "classic" }),
  ],
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: pkg.entrypoints || defaultEntry,
      fileName: (format) => (format === "es" ? "index.mjs" : "index.js"),
    },
    watch: flags.dev ? { clearScreen: true } : undefined,
    rollupOptions: {
      external,
      treeshake: true,
      output: [
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          entryFileNames: "[name].js",
        },
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          entryFileNames: "[name].mjs",
        },
      ],
    },
  },
})
