import { useColorMode } from "@chakra-ui/color-mode"
import { css, StyleObjectOrFn } from "@chakra-ui/css"
import { Dict, get, StringOrNumber } from "@chakra-ui/utils"
import { useTheme } from "./providers"

export function useChakra<T extends Dict = Dict>() {
  const { colorMode, toggleColorMode } = useColorMode()
  const theme = useTheme() as T
  return { colorMode, toggleColorMode, theme }
}

export function useThemeDefaultProps(themeKey: string) {
  const theme = useTheme()
  return get(theme, `components.${themeKey}.defaultProps`)
}

export function useCss(styles: StyleObjectOrFn) {
  const theme = useTheme()
  return css(styles)(theme)
}

export function useToken(
  scale: string,
  token: StringOrNumber,
  fallback?: StringOrNumber,
) {
  const theme = useTheme()
  const path = `${scale}.${token}`
  return get(theme, path, fallback ?? token)
}
