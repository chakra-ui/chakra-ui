import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/core"
import { Text } from "../src"

export default {
  title: "Text",
}

export const Issue2464 = () => {
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

  return (
    <ChakraProvider theme={theme}>
      <Text variant="customCaps">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
        sapiente.
      </Text>
    </ChakraProvider>
  )
}
