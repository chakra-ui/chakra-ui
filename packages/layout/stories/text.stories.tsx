import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/core"
import { Text } from "../src"

export default {
  title: "Text",
}

const theme = extendTheme({
  components: {
    Text: {
      variants: {
        customCaps: {
          textTransform: "uppercase",
        },
      },
    },
  },
})

// see https://github.com/chakra-ui/chakra-ui/issues/2464
export const withVariant = () => (
  <ChakraProvider theme={theme}>
    <Text variant="customCaps">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.
    </Text>
  </ChakraProvider>
)

// see https://github.com/chakra-ui/chakra-ui/issues/2464
export const overrideVariant = () => (
  <ChakraProvider theme={theme}>
    <Text variant="customCaps" casing="lowercase">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.
    </Text>
  </ChakraProvider>
)
