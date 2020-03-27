import { render } from "@chakra-ui/test-utils"
import React from "react"
import { Box } from ".."

test("should render box correctly", () => {
  const tools = render(<Box>This is box</Box>)
  expect(tools.asFragment()).toMatchSnapshot()
})

test("as - prop works correctly", () => {
  const tools = render(
    <Box as="a" href="www.google.com">
      This is box
    </Box>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})
