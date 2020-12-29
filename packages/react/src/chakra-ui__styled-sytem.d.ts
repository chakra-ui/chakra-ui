import { ChakraTheme } from "@chakra-ui/styled-system"
import { Theme } from "@chakra-ui/theme"

declare module "@chakra-ui/styled-system" {
  export interface ChakraTheme extends ChakraTheme, Theme {}
}
