import { ThemingProps } from "@chakra-ui/styled-system"
import { isObject } from "@chakra-ui/utils/is"
import { mergeThemeOverride, ThemeExtension } from "./extend-theme"

export function withDefaultSize({
  size,
  components,
}: {
  size: ThemingProps["size"]
  components?: string[] | Record<string, any>
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
          const withSize = {
            defaultProps: {
              size,
            },
          }
          return [componentName, withSize]
        }),
      ),
    })
  }
}
