import { promises as fs } from "fs"
import { join } from "path"
import { kebabCase } from "scule"

interface Params {
  slug: string[]
}

export async function GET(req: Request, ctx: { params: Promise<Params> }) {
  const { slug } = await ctx.params
  const url = new URL(req.url)
  const search = url.searchParams.get("search")

  try {
    // Route: /api/theme
    if (!slug || slug.length === 0) {
      return handleFileRoute("index.json", null, "Theme data not found")
    }

    // Single segment routes
    if (slug.length === 1) {
      const route = slug[0]

      switch (route) {
        case "tokens":
          return handleFileRoute("tokens.json", null, "Tokens index not found")

        case "semantic-tokens":
        case "semanticTokens":
          return handleFileRoute(
            "semantic-tokens.json",
            null,
            "Semantic tokens index not found",
          )

        case "layer-styles":
        case "layerStyles":
          return handleFileRoute(
            "layer-styles.json",
            search,
            "Layer styles not found",
          )

        case "text-styles":
        case "textStyles":
          return handleFileRoute(
            "text-styles.json",
            search,
            "Text styles not found",
          )

        case "animation-styles":
        case "animationStyles":
          return handleFileRoute(
            "animation-styles.json",
            search,
            "Animation styles not found",
          )

        default:
          return createErrorResponse("Route not found")
      }
    }

    // Two segment routes
    if (slug.length === 2) {
      const [routeType, category] = slug

      switch (routeType) {
        case "tokens":
          return handleCategoryRoute("tokens", category, search)

        case "semantic-tokens":
        case "semanticTokens":
          return handleCategoryRoute("semantic-tokens", category, search)

        default:
          return createErrorResponse("Route not found")
      }
    }

    // Default 404 for unrecognized routes
    return createErrorResponse("Route not found")
  } catch (error) {
    console.error("Theme API error:", error)
    return createErrorResponse("Internal server error", 500)
  }
}

async function readThemeFile(filename: string) {
  try {
    const filePath = join(process.cwd(), "public", "r", "theme", filename)
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading theme file ${filename}:`, error)
    return null
  }
}

function filterArray(array: string[], search: string): string[] {
  if (!search) return array
  return array.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  )
}

function createResponse(data: any, status = 200) {
  return Response.json(data, { status })
}

function createErrorResponse(message: string, status = 404) {
  return createResponse({ error: message }, status)
}

async function handleFileRoute(
  filename: string,
  search?: string | null,
  errorMessage?: string,
) {
  const data = await readThemeFile(filename)
  if (!data) {
    return createErrorResponse(errorMessage || `${filename} not found`)
  }

  const filtered = Array.isArray(data) ? filterArray(data, search || "") : data
  return createResponse(filtered)
}

async function handleCategoryRoute(
  basePath: string,
  category: string,
  search?: string | null,
) {
  const filename = `${basePath}/${kebabCase(category)}.json`
  const data = await readThemeFile(filename)

  if (!data) {
    return createErrorResponse(
      `${basePath.replace("-", " ")} category '${category}' not found`,
    )
  }

  const filtered = filterArray(data, search || "")
  return createResponse(filtered)
}
