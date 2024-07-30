import { readFile } from "fs/promises"
import { resolve } from "path"

export const readExampleFile = async (name: string) => {
  const filePath = resolve("../compositions/src/examples", `${name}.tsx`)

  let fileContent = await readFile(filePath, "utf-8")
  fileContent = fileContent
    .replaceAll("compositions/ui", "@/components/ui")
    .replace(/export const \w+ = \(\) => \{/, "const Demo = () => {")

  return fileContent
}
