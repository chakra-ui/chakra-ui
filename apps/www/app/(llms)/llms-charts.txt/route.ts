import { docs } from "@/.velite"
import { cleanupContent } from "../shared"

export const dynamic = "force-static"

export async function GET() {
  let content = "<SYSTEM>Documentation for charts in Chakra UI v3</SYSTEM>\n\n"

  const chartDocs = docs.filter((doc: { slug: string }) =>
    doc.slug.startsWith("docs/charts"),
  )

  for (const doc of chartDocs) {
    if (!doc.llm || doc.llm?.length === 0) continue
    const llm = cleanupContent(doc.llm)
    content += `# ${doc.title}\n\n${llm}\n\n`
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
