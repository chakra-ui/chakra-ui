export interface ThemeTypings extends EmptyThemeTypings {}

export interface EmptyThemeTypings {
  borders: string
  colors: string
  colorSchemes: string
  fonts: string
  fontSizes: string
  fontWeights: string
  letterSpacings: string
  lineHeights: string
  radii: string
  shadows: string
  sizes: string
  space: string
  zIndices: string
  components: {
    [componentName: string]: {
      sizes: string
      variants: string
    }
  }
}
