import { docs } from "@/.velite"
import { getBaseUrl } from "../shared"

export const dynamic = "force-static"

export async function GET() {
  const baseUrl = `${getBaseUrl()}/llms-component`
  const components = new Set<{ id: string; path: string; fullPath: string }>()

  docs
    .filter(
      (doc) =>
        doc.slug.startsWith("docs/components/") &&
        !doc.slug.includes("concepts"),
    )
    .forEach((doc) => {
      const parts = doc.slug.split("/")
      const component = parts[2]
      components.add({
        id: component,
        path: `${baseUrl}/${component}.txt`,
        fullPath: `${baseUrl}/${component}-full.txt`,
      })
    })

  return Response.json(Array.from(components), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
