import { ColorModeOptions } from "@chakra-ui/system"
import { Breakpoints, Styles } from "@chakra-ui/theme-tools"
import { Dict } from "@chakra-ui/utils"
import { StyleObjectOrFn, ThemeThunk } from "@chakra-ui/styled-system"

export type RecursiveProperty<Nested = string | number> =
  | RecursiveObject<Nested>
  | Nested

export interface RecursiveObject<Nested = string | number> {
  [property: string]: RecursiveProperty<Nested>
}

export interface ThemeConfig extends ColorModeOptions {}
export type ThemeTransitions = RecursiveObject & {
  property: RecursiveObject
  easing: RecursiveObject
  duration: RecursiveObject
}

export interface ColorHues {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}
export type Colors = RecursiveObject<
  Record<string, Partial<ColorHues>> | string
>
export type ThemeDirection = "ltr" | "rtl"

interface ComponentDefaultProps extends Record<string, any> {
  size?: string
  variant?: string
  colorScheme?: string
}

interface SystemStyleObjectRecord {
  [key: string]: StyleObjectOrFn
}

export interface ComponentSingleStyleConfig {
  baseStyle?: StyleObjectOrFn
  sizes?: SystemStyleObjectRecord
  variants?: SystemStyleObjectRecord
  defaultProps?: ComponentDefaultProps
}

export interface ComponentMultiStyleConfig {
  parts?: string[]
  baseStyle?: ThemeThunk<SystemStyleObjectRecord>
  sizes?: SystemStyleObjectRecord
  variants?: SystemStyleObjectRecord
  defaultProps?: ComponentDefaultProps
}

export type ComponentStyleConfig =
  | ComponentSingleStyleConfig
  | ComponentMultiStyleConfig

export interface ThemeComponents {
  [componentName: string]: ComponentStyleConfig
}

interface Typography {
  fonts: RecursiveObject<string>
  fontSizes: RecursiveObject
  fontWeights: RecursiveObject
  letterSpacings: RecursiveObject
  lineHeights: RecursiveObject
}

interface Foundations extends Typography {
  borders: RecursiveObject
  breakpoints: Breakpoints<Dict>
  colors: Colors
  radii: RecursiveObject
  shadows: RecursiveObject<string>
  sizes: RecursiveObject
  space: RecursiveObject
  transition: ThemeTransitions
  zIndices: RecursiveObject
}

export interface ChakraTheme extends Foundations {
  components: ThemeComponents
  config: ThemeConfig
  direction: ThemeDirection
  styles: Styles
  layerStyles?: SystemStyleObjectRecord
  textStyles?: SystemStyleObjectRecord
}
