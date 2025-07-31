import { readExampleFile, readTypesFile } from "@/lib/read-public-file"

interface Params {
  id: string
}

async function inferComponent(id: string) {
  const { components, charts } = await readTypesFile("index.json")
  const allComponents = [...components, ...charts]
  const cleanId = id.replace(/\.tsx$/, "")
  const segments = cleanId.split("-")
  for (let i = segments.length; i > 0; i--) {
    const component = segments.slice(0, i).join("-")
    if (allComponents.includes(component)) return component
  }
  return null
}

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { id: exampleId } = await ctx.params

  try {
    const component = await inferComponent(exampleId)

    if (!component) {
      return Response.json({ error: "Component not found" }, { status: 404 })
    }

    const examples = await readExampleFile(`${component}.json`)
    const example =
      examples.examples.find((ex: any) => ex.name === exampleId) || examples

    return Response.json(example)
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
