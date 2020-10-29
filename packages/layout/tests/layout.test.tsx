import { render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Box, Badge, Flex } from "../src"

describe("<Box />", () => {
  test("renders box correctly", () => {
    const { asFragment } = render(<Box>This is box</Box>)
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(<Box>this is a box</Box>)
  })

  test("as - prop works correctly", () => {
    const { asFragment } = render(
      <Box as="a" href="www.google.com">
        This is box
      </Box>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe("<Badge />", () => {
  test("renders with default theming", () => {
    const { asFragment } = render(<Badge>Badge</Badge>)
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(<Badge>this is a badge</Badge>)
  })

  test("overrides the theming props", () => {
    const { asFragment } = render(
      <Badge variant="outline" colorScheme="pink">
        Badge
      </Badge>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe("<Flex />", () => {
  test("renders all the allowed shorthand style props", () => {
    const { asFragment } = render(
      <Flex
        align="stretch"
        justify="start"
        wrap="nowrap"
        direction="row"
        basis="auto"
        grow={1}
        shrink={0}
      />,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
