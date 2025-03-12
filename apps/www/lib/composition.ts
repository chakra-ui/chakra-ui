import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

export const readExampleFile = async (
  name: string,
  scope: "examples" | "ui" = "examples",
  ext = "tsx",
) => {
  const filePath = resolve("../compositions/src", scope, `${name}.${ext}`)

  let fileContent = await readFile(filePath, "utf-8")
  fileContent = fileContent
    .replaceAll("compositions/ui", "@/components/ui")
    .replace(/export const \w+ = \(\) => \{/, "const Demo = () => {")

  return fileContent
}
