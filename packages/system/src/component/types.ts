import { Dict } from "@chakra-ui/utils/src"

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
