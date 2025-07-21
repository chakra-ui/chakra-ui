import { docs } from "@/.velite"

export const dynamic = "force-static"

export async function GET() {
  let content = "<SYSTEM>Documentation for theming Chakra UI v3.</SYSTEM>\n\n"

  const themingDocs = docs.filter((doc) => doc.slug.startsWith("docs/theming"))

  for (const doc of themingDocs) {
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
