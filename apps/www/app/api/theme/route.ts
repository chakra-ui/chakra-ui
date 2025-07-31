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
      return Response.json({ error: "Theme data not found" }, { status: 404 })
    }

    return Response.json(themeIndex)
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
