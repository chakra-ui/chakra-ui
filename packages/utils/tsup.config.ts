import glob from "fast-glob"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: glob.sync(["src/**/!(*.test|*.stories).ts"]),
  format: ["cjs", "esm"],
  clean: true,
  treeshake: "smallest",
})
