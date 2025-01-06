import { globby } from "globby"
import { rm } from "node:fs/promises"

export async function cleanFiles() {
  const files = await globby("src/**/*.{ts,tsx}", {
    ignore: ["src/{def,utilities}.ts"],
  })

  const promises = files.map(async (file) => {
    return rm(file, { recursive: true })
  })

  await Promise.all(promises)
}
