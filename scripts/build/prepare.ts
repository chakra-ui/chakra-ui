import { Project } from "find-packages"
import { join } from "path/posix"
import { getProjectEntries } from "./entries"

const esmDir = join("dist", "esm")
const cjsDir = join("dist", "cjs")
const typesDir = join("dist", "types")

const swapExt = (path: string, ext: string) =>
  path.replace("src/", "/").replace(/\.[^.]+$/, ext)

export async function prepareProject(project: Project) {
  const { manifest } = project

  const entries = getProjectEntries(project)

  const exports = entries.reduce((acc, [name, source]) => {
    const entry = name === "index" ? "." : name.replace(/\/index$/, "")
    return {
      ...acc,
      [entry]: {
        source,
        import: {
          types: `./${join(typesDir, swapExt(source, ".d.mts"))}`,
          default: `./${join(esmDir, swapExt(source, ".mjs"))}`,
        },
        require: {
          types: `./${join(typesDir, swapExt(source, ".d.ts"))}`,
          default: `./${join(cjsDir, swapExt(source, ".cjs"))}`,
        },
      },
    }
  }, {})

  // @ts-expect-error
  manifest.exports = {
    ...exports,
    "./package.json": "./package.json",
  }

  manifest.main = join(cjsDir, "index.cjs")
  manifest.module = join(esmDir, "index.mjs")
  manifest.types = join(typesDir, "index.d.ts")

  project.writeProjectManifest(manifest)
}
