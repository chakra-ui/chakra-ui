import react from "@vitejs/plugin-react"
import { join } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

const pkg = require(join(process.cwd(), "package.json"))

const args = process.argv.slice(2)

const flags = {
  dts: args.includes("--dts"),
  dev: args.includes("--watch"),
}

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
]

// see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    flags.dts &&
      dts({
        rollupTypes: true,
        skipDiagnostics: true,
      }),
    react({ jsxRuntime: "classic" }),
  ],
  build: {
    target: "es2015",
    minify: false,
    lib: {
      entry: join(process.cwd(), "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.js"),
    },
    watch: flags.dev ? { clearScreen: true } : undefined,
    rollupOptions: {
      external,
    },
  },
})
