import glob from "fast-glob"
import { readFileSync, writeFileSync } from "node:fs"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: glob.sync(["src/**/!(*.test|*.stories).ts"]),
  format: ["cjs", "esm"],
  clean: true,
  treeshake: "smallest",
  outExtension(ctx) {
    return { js: ctx.format === "cjs" ? ".js" : ".mjs" }
  },
  banner() {
    return { js: "'use client'" }
  },
  async onSuccess() {
    // remove 'use client' from index builds
    const indexFiles = glob.sync(["dist/index.{js.mjs}"])
    indexFiles.forEach((file) => {
      const content = readFileSync(file, "utf-8")
      const newContent = content.replace(/'use client';\n/, "")
      writeFileSync(file, newContent)
    })
  },
})
