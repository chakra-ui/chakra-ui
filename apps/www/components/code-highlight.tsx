import { Absolute } from "@chakra-ui/react"
import { readFile } from "fs/promises"
import { resolve } from "path"
import { codeToHtml } from "shiki"
import { CopyButton } from "./copy-button"

interface Props {
  name: string
}

export const CodeHighlight = async (props: Props) => {
  const { name } = props

  const filePath = resolve("../compositions/src/examples", `${name}.tsx`)

  let fileContent = await readFile(filePath, "utf-8")
  fileContent = fileContent.replaceAll("compositions/ui", "@/components/ui")

  const html = await codeToHtml(fileContent, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: "light",
  })

  return (
    <>
      <div
        className="code-highlight"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Absolute top="4" right="4">
        <CopyButton value={fileContent} />
      </Absolute>
    </>
  )
}
