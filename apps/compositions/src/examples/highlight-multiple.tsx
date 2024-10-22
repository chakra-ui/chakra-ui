import { Heading, Highlight } from "@chakra-ui/react"

export const HighlightMultiple = () => {
  return (
    <Heading lineHeight="tall">
      <Highlight
        query={["spotlight", "emphasize", "Accentuate"]}
        styles={{ px: "0.5", bg: "teal.muted" }}
      >
        With the Highlight component, you can spotlight, emphasize and
        accentuate words.
      </Highlight>
    </Heading>
  )
}
