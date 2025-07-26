import { ProjectSdk } from "@/utils/project-sdk"
import { isChartComponent } from "@/utils/shared"

interface Params {
  id: string
}

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { id: exampleId } = await ctx.params

  const project = new ProjectSdk()
  const component = project.getComponentFromExample(exampleId)

  if (!component) {
    return new Response(JSON.stringify({ error: "Component not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const example = project.parseExample(
    component,
    isChartComponent(component)
      ? `charts/${exampleId}.tsx`
      : `${exampleId}.tsx`,
  )

  return new Response(JSON.stringify(example), {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
