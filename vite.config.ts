import react from "@vitejs/plugin-react"
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
  "react/jsx-runtime",
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
]

// see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    flags.dts &&
      dts({
        skipDiagnostics: true,
        entryRoot: "src",
        staticImport: true,
      }),
    react(),
  ],
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: join(process.cwd(), "src/index.ts"),
      formats: ["es", "cjs"],
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
