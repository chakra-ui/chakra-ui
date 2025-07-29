import { promises as fs } from "fs"
import { join } from "path"

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

export async function GET() {
  try {
    // Read the main types index file
    const typesIndex = await readTypesFile("index.json")

    if (!typesIndex) {
      return new Response(JSON.stringify({ error: "Types data not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return new Response(JSON.stringify(typesIndex), {
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
