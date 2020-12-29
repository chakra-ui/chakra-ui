import * as CSS from "csstype"
import { Length } from "./utils"

type ThemeValue<T> = T[] | Record<string, T>
type NestedThemeValue<T> = Record<string, T | ThemeValue<T>>

interface Component {
  readonly parts?: string[]
  baseStyle?: any
  variants?: any
  sizes?: any
  defaultProps?: {
    variant?: string
    size?: string
    colorScheme?: string
  }
}

export interface ChakraTheme {
  breakpoints: Record<string, Length> | Length[]
  space: ThemeValue<CSS.Property.Margin<Length>>
  fontSizes: ThemeValue<CSS.Property.FontSize<Length>>
  colors: NestedThemeValue<CSS.Property.Color>
  fonts: ThemeValue<CSS.Property.FontFamily>
  fontWeights: ThemeValue<CSS.Property.FontWeight>
  lineHeights: ThemeValue<CSS.Property.LineHeight<Length>>
  letterSpacings: ThemeValue<CSS.Property.LetterSpacing<Length>>
  sizes: NestedThemeValue<
    CSS.Property.Height<Length> | CSS.Property.Width<Length>
  >
  borders: ThemeValue<CSS.Property.Border<Length>>
  borderStyles: ThemeValue<CSS.Property.BorderStyle>
  borderWidths: ThemeValue<CSS.Property.BorderWidth<Length>>
  radii: ThemeValue<CSS.Property.BorderRadius<Length>>
  shadows: ThemeValue<CSS.Property.BoxShadow>
  zIndices: ThemeValue<CSS.Property.ZIndex | string>
  components: {
    //[component: string]: Component
    [component: string]: any
  }
  styles: any
  config: any
  direction?: "ltr" | "rtl"
}
