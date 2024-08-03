import { highlightCode } from "@/lib/highlight-code"
import { Box } from "@chakra-ui/react"
import { readDemoFile } from "./read-demo-file"

export const DemoCode = async (props: {
  name: string
  extension?: string
  opts?: Partial<Parameters<typeof highlightCode>[1]>
}) => {
  const content = await readDemoFile(props.name, props.extension)
  const html = await highlightCode(content, {
    lang: "ts",
    themes: {
      light: "github-light",
      dark: "vitesse-black",
    },
  })
  return (
    <Box
      w="full"
      css={{
        "& > pre": {
          p: "4",
          minH: "md",
          rounded: "md",
          "--shiki-dark-bg": "#050D0D!",
        },
      }}
      className="code-highlight"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
