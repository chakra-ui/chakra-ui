import { readFile } from "fs/promises"
import { resolve } from "path"

export const readDemoFile = async (name: string) => {
  const filePath = resolve("app/page/data", `${name}.ts`)
  let fileContent = await readFile(filePath, "utf-8")
  return fileContent
}
