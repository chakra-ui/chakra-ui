import { useTheme } from "../theme-provider"
import { getComponentStyles, getComponentDefaults } from "./get-component-style"

export function useComponentStyle(options: any) {
  const { variantSize, variant, themeKey, ...props } = options
  const theme = useTheme()
  return getComponentStyles(
    { variant, variantSize, theme, ...props },
    { themeKey },
  )
}

export function useComponentDefaults(themeKey: string) {
  const theme = useTheme()
  return getComponentDefaults(theme, themeKey)
}
