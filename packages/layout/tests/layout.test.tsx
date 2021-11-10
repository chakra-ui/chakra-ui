import { render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Box, Badge, Container, Divider, Flex } from "../src"

describe("<Box />", () => {
  test("passes a11y test", async () => {
    await testA11y(<Box>this is a box</Box>)
  })

  test("as - prop works correctly", () => {
    const { getByText } = render(
      <Box as="a" href="www.google.com">
        Box
      </Box>,
    )
    expect(getByText("Box").nodeName).toBe("A")
  })
})

describe("<Badge />", () => {
  test("passes a11y test", async () => {
    await testA11y(<Badge>this is a badge</Badge>)
  })
})

describe("<Container />", () => {
  test("renders box correctly", () => {
    render(<Container>This is container</Container>)
  })

  test("centerContent - prop works correctly", () => {
    render(<Container centerContent>This is centered container</Container>)
  })

  test("themeing works correctly", () => {
    const theme = extendTheme({
      components: {
        Container: {
          variants: {
            customBackground: {
              bgColor: "red.500",
            },
          },
        },
      },
    })
    render(
      <ChakraProvider theme={theme}>
        <Container variant="customBackground">
          This is container has a red background
        </Container>
      </ChakraProvider>,
    )
  })
})

describe("<Flex />", () => {
  test("renders all the allowed shorthand style props", () => {
    render(
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
  })
})

describe("<Divider />", () => {
  test("renders with default theming", () => {
    render(<Divider />)
  })

  test("overrides the theming props", () => {
    render(<Divider variant="dashed" />)
  })
})
