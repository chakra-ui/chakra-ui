import { defineConfig } from "tsup"

export default defineConfig([
  // STDIO build
  {
    entry: { stdio: "src/stdio.ts", cli: "src/cli.ts" },
    format: "esm",
    outDir: "dist",
    treeshake: "safest",
    splitting: false,
  },
  // HTTP build
  {
    entry: { index: "src/http.ts" },
    format: "esm",
    outDir: "api",
    treeshake: "safest",
    splitting: false,
  },
])
