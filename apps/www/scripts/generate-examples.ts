import { uniq } from "@/utils/shared"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { ProjectSdk } from "../utils/project-sdk"

async function main() {
  const project = new ProjectSdk()

  const promises = project.components.map(async (component) => {
    const examples = await project.parseExamples(component)
    const snippet = project.getSnippetCode(component)
    const file = snippet ? project.getSnippetImportPath(component) : undefined
    return { name: component, file, snippet, examples }
  })
  const result = await Promise.all(promises)

  const writePromises = result
    .filter((json) => json.examples.length > 0)
    .map((json) => {
      ensureDirSync(join(project.publicPath, "r", "examples"))
      return writeFile(
        join(project.publicPath, "r", "examples", `${json.name}.json`),
        JSON.stringify(json, null, 2),
      )
    })

  const indexContent = result.flatMap((json) =>
    json.examples.map((ex) => ex.name),
  )

  await Promise.all([
    ...writePromises,
    writeFile(
      join(project.publicPath, "r", "examples", "index.json"),
      JSON.stringify(uniq(indexContent), null, 2),
    ),
  ])
}

main()
