import { getLlmContent } from "@/lib/llms-utils"
import { redirect } from "next/navigation"
import { docs } from ".velite"

interface RouteContext {
  params: Promise<{ slug: string[] }>
}

export async function GET(request: Request, context: RouteContext) {
  const params = await context.params

  // Check if the slug includes .mdx to return LLM content
  const isLlmRequest = params.slug[params.slug.length - 1].includes(".mdx")

  if (!isLlmRequest) {
    return redirect("/llms.txt")
  }

  // Remove .mdx from slug segments for matching
  const cleanSlug = params.slug.map((segment) => segment.replace(".mdx", ""))
  const page = docs.find((doc) => doc.slug === ["docs", ...cleanSlug].join("/"))

  if (!page || !page.llm) {
    return redirect("/llms.txt")
  }

  return new Response(getLlmContent(page), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
