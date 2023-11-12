import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "tsup"

function removeDirective(fileName: string) {
  const file = path.resolve(__dirname, "dist", fileName)
  return fs.promises.writeFile(
    file,
    fs.readFileSync(file, "utf-8").replace("'use client'\n", ""),
  )
}

export default defineConfig({
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  banner: {
    js: "'use client'",
  },
  async onSuccess() {
    await Promise.all([
      removeDirective("index.mjs"),
      removeDirective("index.js"),
    ])
  },
})
