import { Dict } from "@chakra-ui/utils"

export interface ModifierStyleProps {
  variant?: string
  colorScheme?: string
  size?: string
  theme?: Dict
}

export interface ChakraOptions {
  variants?: Dict
  sizes?: Dict
  themeKey?: string
}
