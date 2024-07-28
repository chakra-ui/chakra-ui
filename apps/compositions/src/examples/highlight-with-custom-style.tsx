import { Highlight } from "@chakra-ui/react"

export const HighlightWithCustomStyle = () => {
  return (
    <Highlight query="component" styles={{ fontWeight: "semibold" }}>
      With the Highlight component, you can spotlight words.
    </Highlight>
  )
}
