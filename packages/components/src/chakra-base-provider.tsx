import { baseTheme } from "@chakra-ui/theme"
import type { ChakraProviderProps } from "./provider/create-provider"
import { createProvider } from "./provider/create-provider"

export const ChakraBaseProvider = createProvider(baseTheme)
export { ChakraProviderProps }
