import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { colorModeConfig } from "../lib/color-mode-utils"

const theme = extendTheme({
  config: colorModeConfig,
})

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
