export type BaseThemeConfig = {
  initialColorMode?: "light" | "dark" | "system"
  useSystemColorMode?: boolean
  disableTransitionOnChange?: boolean
  useReducedMotion?: boolean | "system"
}

export interface BaseThemeTypings {
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

export {}
