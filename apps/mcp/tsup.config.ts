import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/stdio.ts", "src/http.ts"],
  format: ["esm"],
  treeshake: false,
  splitting: false,
})
