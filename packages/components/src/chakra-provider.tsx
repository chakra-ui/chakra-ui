import { theme as defaultTheme } from "@chakra-ui/theme"
import type { ChakraProviderProps } from "./provider/create-provider"
import { createProvider } from "./provider/create-provider"

export type ChakraProviderComponent = React.FC<ChakraProviderProps>

export const ChakraProvider = createProvider(defaultTheme)
export { ChakraProviderProps }
