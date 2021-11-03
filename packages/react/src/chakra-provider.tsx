import { ChakraProvider as BaseChakraProvider } from "@chakra-ui/provider"
import { theme } from "@chakra-ui/theme"

export const ChakraProvider = BaseChakraProvider
export type { ChakraProviderProps } from "@chakra-ui/provider"

ChakraProvider.defaultProps = {
  theme,
}
