import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
})

export const Chakra = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
