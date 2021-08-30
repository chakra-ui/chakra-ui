import { ChakraProvider as BaseChakraProvider } from "@chakra-ui/provider"
import defaultTheme from "@chakra-ui/theme"

export const ChakraProvider = BaseChakraProvider

ChakraProvider.defaultProps = {
  theme: defaultTheme,
}
