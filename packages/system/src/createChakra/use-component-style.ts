import { useTheme } from "../color-mode"
import getComponentStyles from "./get-component-style"

export function useComponentStyle<T extends object>({
  variantSize,
  variant,
  themeKey,
  ...props
}: any) {
  const theme = useTheme() as T
  return getComponentStyles(
    { variant, variantSize, theme, ...props },
    { themeKey },
  )
}

export default useComponentStyle
