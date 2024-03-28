import fg from "fast-glob"
import { readFileSync, writeFileSync } from "fs"
import path from "path"

const files = fg.sync("packages/hooks/src/**/*.ts")

files.forEach((file) => {
  const baseName = path.basename(file)
  if (!baseName.startsWith("use")) return
  const content = readFileSync(file, "utf-8")
  writeFileSync(file, `'use client'\n${content}`)
})
