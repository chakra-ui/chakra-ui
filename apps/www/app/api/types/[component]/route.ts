import { readTypesFile } from "@/lib/read-public-file"

export const dynamic = "force-static"

interface Params {
  component: string
}

const componentRedirects: Record<string, string> = {
  hstack: "stack",
  vstack: "stack",
}

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { component } = await ctx.params

  const actualComponent = componentRedirects[component] || component

  const componentTypes = await readTypesFile(`${actualComponent}.json`)

  if (!componentTypes) {
    return Response.json(
      { error: `Component types for '${component}' not found` },
      { status: 404 },
    )
  }

  return Response.json(componentTypes)
}
