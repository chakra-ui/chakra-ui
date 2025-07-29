import { promises as fs } from "fs"
import { join } from "path"

interface Params {
  component: string
}

// Map of component redirects
const componentRedirects: Record<string, string> = {
  hstack: "stack",
  vstack: "stack",
}

async function readTypesFile(filename: string) {
  try {
    const filePath = join(process.cwd(), "public", "r", "types", filename)
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading types file ${filename}:`, error)
    return null
  }
}

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { component } = await ctx.params

  try {
    // Apply component redirects
    const actualComponent = componentRedirects[component] || component

    // Read the component types file
    const componentTypes = await readTypesFile(`${actualComponent}.json`)

    if (!componentTypes) {
      return new Response(
        JSON.stringify({
          error: `Component types for '${component}' not found`,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    return new Response(JSON.stringify(componentTypes), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Types API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
