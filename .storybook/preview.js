import { extendTheme } from "@chakra-ui/react"

const getThemeOverride = () => {
  try {
    const theme = window.opener.chakraTheme
    console.log("Found theme: ", theme)
    return theme || {}
  } catch (e) {
    console.log("Failed to parse custom theme override", e)
    return {}
  }
}

export const parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  chakra: {
    theme: extendTheme({
      semanticTokens: {
        colors: {
          semantic: {
            default: "red.500",
            _light: "red.500",
            _dark: "blue.400",
          },
        },
      },
      ...getThemeOverride(),
    }),
  },
}

export const decorators = []
