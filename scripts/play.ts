import fg from "fast-glob"
import { writeFileSync } from "fs"
import path, { join } from "path"

const files = fg.sync("packages/react/src/components/**", {
  onlyDirectories: true,
})

const result: Record<string, any> = {}

files.forEach((file) => {
  const baseName = path.basename(file)
  result[`./${baseName}`] = {
    source: "./" + join(".", "src", baseName, "index.ts"),
    import: {
      type: "./" + join(".", "dist", "types", baseName, "index.d.ts"),
      default: "./" + join(".", "dist", "esm", baseName, "index.js"),
    },
    require: {
      types: "./" + join(".", "dist", "types", baseName, "index.d.ts"),
      default: "./" + join(".", "dist", "cjs", baseName, "index.cjs"),
    },
  }
})

writeFileSync("play.json", JSON.stringify(result), "utf-8")
