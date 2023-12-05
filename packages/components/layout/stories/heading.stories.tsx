import * as React from "react"
import { ChakraProvider, extendTheme } from "../../react/src"
import { Heading } from "../src"

export default {
  title: "Components / Typography / Heading",
}

const theme = extendTheme({
  components: {
    Heading: {
      variants: {
        customCaps: {
          textTransform: "uppercase",
          fontSize: {
            base: "4xl",
            lg: "6xl",
          },
        },
      },
    },
  },
})

// see https://github.com/chakra-ui/chakra-ui/issues/2464
export const withVariant = () => (
  <ChakraProvider theme={theme}>
    <Heading variant="customCaps">
      Heading ipsum dolor sit amet, consectetur adipisicing elit. Amet,
      sapiente.
    </Heading>
  </ChakraProvider>
)
