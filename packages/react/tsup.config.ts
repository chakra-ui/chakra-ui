import glob from "fast-glob"
import { readFileSync, unlinkSync } from "fs"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src"],
  format: ["esm"],
  clean: true,
  splitting: true,
  treeshake: "smallest",
  minifySyntax: true,
  minifyIdentifiers: true,
  outExtension(ctx) {
    return { js: ctx.format === "cjs" ? ".js" : ".mjs" }
  },
  async onSuccess() {
    const files = glob.sync("dist/**/*", { onlyFiles: false })
    files.forEach((file) => {
      if (file.endsWith(".mjs")) {
        const content = readFileSync(file, "utf-8")
        if (content.trim() === "") unlinkSync(file)
      }
    })
  },
})
