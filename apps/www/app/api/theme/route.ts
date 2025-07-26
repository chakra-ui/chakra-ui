import { promises as fs } from "fs"
import { join } from "path"

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

export async function GET() {
  try {
    // Read the main theme index file
    const themeIndex = await readThemeFile("index.json")

    if (!themeIndex) {
      return new Response(JSON.stringify({ error: "Theme data not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return new Response(JSON.stringify(themeIndex), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
