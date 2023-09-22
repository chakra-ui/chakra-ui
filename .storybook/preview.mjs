import { extendTheme } from "../packages/components/src"

export const parameters = {
  options: {
    storySort: (a, b) => {
      a.title === b.title
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true })
    },
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
    }),
  },
}

export const decorators = []
