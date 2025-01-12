import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { ProjectSdk } from "./project-sdk"

async function main() {
  const project = new ProjectSdk()

  const promises = project.components.map(async (component) => {
    const examples = await project.parseExamples(component)
    const snippet = project.getSnippetCode(component)
    const file = snippet ? project.getSnippetImportPath(component) : undefined
    const json = { name: component, file, snippet, examples }
    ensureDirSync(join(project.publicPath, "pixie"))
    return writeFile(
      join(project.publicPath, "pixie", `${component}.json`),
      JSON.stringify(json, null, 2),
    )
  })

  await Promise.all(promises)
}

main()
