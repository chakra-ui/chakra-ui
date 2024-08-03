import { readFile } from "fs/promises"
import { resolve } from "path"

export const readDemoFile = async (name: string, extension: string = "ts") => {
  const filePath = resolve("app/page/data", `${name}.${extension}`)
  let fileContent = await readFile(filePath, "utf-8")
  return fileContent
}
