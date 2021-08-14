/**
 * This file will be replaced by running "npx @chakra-ui/cli tokens"
 */
import { Dict } from "@chakra-ui/utils"

export interface ThemeTypings extends EmptyThemeTypings {}

export interface EmptyThemeTypings {
  borders: string
  colors: string
  breakpoints: string
  colorSchemes: string
  fonts: string
  fontSizes: string
  fontWeights: string
  layerStyles: string
  letterSpacings: string
  lineHeights: string
  radii: string
  shadows: string
  sizes: string
  space: string
  textStyles: string
  zIndices: string
  components: {
    [componentName: string]: {
      sizes: string
      variants: string
    }
  }
}

export interface ThemingProps<ThemeComponent extends string = string> {
  variant?: ThemeComponent extends keyof ThemeTypings["components"]
    ? ThemeTypings["components"][ThemeComponent]["variants"] | (string & {})
    : string
  size?: ThemeComponent extends keyof ThemeTypings["components"]
    ? ThemeTypings["components"][ThemeComponent]["sizes"] | (string & {})
    : string
  colorScheme?: ThemeTypings["colorSchemes"] | (string & {})
  orientation?: "vertical" | "horizontal"
  styleConfig?: Dict
}
