import { default as docs } from ".velite/docs.json"

export const dynamic = "force-static"

export async function GET() {
  let content =
    "<SYSTEM>This is the full developer documentation for Chakra UI v3.</SYSTEM>\n\n"

  for (const doc of docs) {
    if (doc.llm.length === 0) continue

    content += `# ${doc.title}\n\n${doc.llm}\n\n`
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
