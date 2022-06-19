import { ChakraProviderProps, extendTheme } from "@chakra-ui/react"
import { Parameters } from "@storybook/react"

export const parameters: Parameters = {
  options: {
    storySort: (a: any[], b: any[]) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  chakra: {
    resetCSS: false,
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
  } as ChakraProviderProps,
}

export const decorators = []
