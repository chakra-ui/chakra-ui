import "@chakra-ui/styled-system"
import { ChakraWebsiteTheme } from "../theme"
import { Theme } from "@chakra-ui/theme"
import { ChakraTheme } from "@chakra-ui/styled-system"

declare module "@chakra-ui/styled-system" {
  export interface ChakraTheme extends ChakraTheme, Theme, ChakraWebsiteTheme {}
}
