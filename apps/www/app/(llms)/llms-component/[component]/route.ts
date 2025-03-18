import {
  cleanupContent,
  findMatchingDocs,
  minifyContent,
  parseComponent,
} from "../../shared"

export const dynamic = "force-static"

interface Params {
  component: string
}

export async function GET(_request: Request, ctx: { params: Promise<Params> }) {
  let { component: componentParam } = await ctx.params
  const { minify, component } = parseComponent(componentParam)

  let content = !minify
    ? `<SYSTEM>Documentation for the ${component} component in Chakra UI v3.</SYSTEM>\n\n`
    : ""

  const componentDocs = findMatchingDocs(component)

  for (const doc of componentDocs) {
    let llm = doc.llm
    if (!llm || llm?.length === 0) continue
    if (minify) llm = minifyContent(llm)
    llm = cleanupContent(llm)
    content += `# ${doc.title}\n\n${llm}\n\n`
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
