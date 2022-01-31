import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Text } from "../src"

export default {
  title: "Components / Typography / Text",
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

// see https://github.com/chakra-ui/chakra-ui/issues/5473
export const withNoOfLinesResponsive = () => (
  <ChakraProvider theme={theme}>
    <Text maxWidth="500px" noOfLines={{ lg: 3, md: 5, sm: 7 }}>
      "Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum."
    </Text>
  </ChakraProvider>
)
