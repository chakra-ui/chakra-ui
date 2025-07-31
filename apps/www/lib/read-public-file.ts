import { promises as fs } from "node:fs"
import { join } from "node:path"

export async function readTypesFile(filename: string) {
  try {
    const filePath = join(process.cwd(), "public", "r", "types", filename)
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading types file ${filename}:`, error)
    return null
  }
}

export async function readExampleFile(filename: string) {
  try {
    const filePath = join(process.cwd(), "public", "r", "examples", filename)
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading example file ${filename}:`, error)
    return null
  }
}
