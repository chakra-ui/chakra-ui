import { Highlight } from "@chakra-ui/react"

export const HighlightBasic = () => {
  return (
    <Highlight query="spotlight" styles={{ px: "0.5", bg: "orange.100" }}>
      With the Highlight component, you can spotlight words.
    </Highlight>
  )
}
