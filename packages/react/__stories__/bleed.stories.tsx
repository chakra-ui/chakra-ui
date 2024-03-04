import { Box } from "../src"
import { Bleed } from "../src/components/bleed"

export default {
  title: "Layout / Bleed",
}

export const Basic = () => (
  <Box padding="4" borderWidth="1px">
    <Bleed inline="4" bg="pink.100" padding="3">
      Some bleed
    </Bleed>
    <Box padding="4">Inner text</Box>
  </Box>
)
