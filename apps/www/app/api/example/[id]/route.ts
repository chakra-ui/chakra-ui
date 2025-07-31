import { readExampleFile } from "@/lib/read-public-file"
import { ProjectSdk } from "@/utils/project-sdk"

interface Params {
  id: string
}

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { id: exampleId } = await ctx.params

  const project = new ProjectSdk()
  const component = project.getComponentFromExample(exampleId)

  if (!component) {
    return Response.json({ error: "Component not found" }, { status: 404 })
  }

  const examples = await readExampleFile(`${component}.json`)
  const example =
    examples.examples.find((ex: any) => ex.name === exampleId) || examples

  return Response.json(example)
}
