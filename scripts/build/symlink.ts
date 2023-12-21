import { Project } from "find-packages"
import { getProjectEntries } from "./entries.js"

export async function symlinkProject(project: Project) {
  const entries = getProjectEntries(project)
  const exports = Object.fromEntries(entries as [string, string][])

  // @ts-expect-error
  project.manifest.exports = exports
  project.manifest.main = "src/index.ts"
  project.manifest.module = "src/index.ts"
  project.manifest.types = "src/index.ts"
  project.writeProjectManifest(project.manifest)
}
