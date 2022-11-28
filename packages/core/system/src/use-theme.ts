import { WithCSSVar } from "@chakra-ui/styled-system"
import { Dict } from "@chakra-ui/utils"
import { ThemeContext } from "@emotion/react"
import { useContext } from "react"

/**
 * `useTheme` is a custom hook used to get the theme object from context.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-theme
 */
export function useTheme<T extends object = Dict>() {
  const theme = useContext(
    ThemeContext as unknown as React.Context<T | undefined>,
  )
  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`",
    )
  }

  return theme as WithCSSVar<T>
}
