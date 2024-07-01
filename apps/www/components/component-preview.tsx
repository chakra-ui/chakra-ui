import { Box } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { CodeHighlight } from "./code-highlight"

interface Props {
  name: string
}

function formatComponentName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

export const ComponentPreview = (props: Props) => {
  const { name } = props
  const componentName = formatComponentName(name)

  const Component = dynamic(() =>
    import(`../../compositions/src/examples/${name}`).then(
      (mod) => mod[componentName],
    ),
  )

  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden" divideY="1px">
      <Box padding="10">
        <Component />
      </Box>
      <Box
        css={{
          position: "relative",
          "& pre": {
            px: "10",
            py: "6",
            maxHeight: "400px",
            overflow: "auto",
          },
          "& code": {
            fontSize: "0.82rem",
            "& *": {
              fontStyle: "normal!",
            },
          },
          _dark: {
            "& :is(.shiki, .shiki span)": {
              color: "var(--shiki-dark)!",
              bg: "var(--shiki-dark-bg)!",
            },
          },
        }}
      >
        <CodeHighlight name={name} />
      </Box>
    </Box>
  )
}
