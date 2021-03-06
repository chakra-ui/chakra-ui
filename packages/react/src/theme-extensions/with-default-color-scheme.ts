import defaultTheme from "@chakra-ui/theme"
import { ThemingProps } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"
import { mergeThemeOverride, ThemeExtension } from "../extend-theme"

export function withDefaultColorScheme({
  colorScheme,
  components = defaultTheme.components,
}: {
  colorScheme: ThemingProps["colorScheme"]
  components?: string[] | Dict
}): ThemeExtension {
  return (theme) => {
    const names = Array.isArray(components)
      ? components
      : components && typeof components === "object"
      ? Object.keys(components)
      : Object.keys(theme.components || {})

    return mergeThemeOverride(theme, {
      components: Object.fromEntries(
        names.map((componentName) => {
          const withColorScheme = {
            defaultProps: {
              colorScheme,
            },
          }
          return [componentName, withColorScheme]
        }),
      ),
    })
  }
}
