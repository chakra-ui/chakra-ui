import { highlightCode } from "@/lib/highlight-code"
import { Box } from "@chakra-ui/react"
import { readDemoFile } from "./read-demo-file"

export const DemoCode = async (props: { name: string }) => {
  const content = await readDemoFile(props.name)
  const html = await highlightCode(content, {
    lang: "ts",
    themes: {
      light: "github-light",
      dark: "vitesse-black",
    },
  })
  return (
    <Box
      // TODO remove
      pb="12"
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
