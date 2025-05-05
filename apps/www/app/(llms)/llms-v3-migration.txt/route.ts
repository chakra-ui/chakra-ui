import { docs } from "@/.velite"

export const dynamic = "force-static"

export async function GET() {
  let content =
    "<SYSTEM>Documentation for migrating to Chakra UI v3.</SYSTEM>\n\n"

  const stylingDocs = docs.filter((doc) =>
    doc.slug.startsWith("docs/get-started/migration"),
  )

  for (const doc of stylingDocs) {
    if (!doc.llm || doc.llm?.length === 0) continue

    content += `# ${doc.title}\n\n${doc.llm}\n\n`
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
