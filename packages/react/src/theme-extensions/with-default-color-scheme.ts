import { ThemingProps } from "@chakra-ui/system"
import { Dict, isObject } from "@chakra-ui/utils"
import { mergeThemeOverride, ThemeExtension } from "../extend-theme"

export function withDefaultColorScheme({
  colorScheme,
  components,
}: {
  colorScheme: ThemingProps["colorScheme"]
  components?: string[] | Dict
}): ThemeExtension {
  return (theme) => {
    let names = Object.keys(theme.components || {})

    if (Array.isArray(components)) {
      names = components
    } else if (isObject(components)) {
      names = Object.keys(components)
    }

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
