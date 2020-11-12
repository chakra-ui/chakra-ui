import { useColorMode } from "@chakra-ui/color-mode"
import { css, SystemStyleObject } from "@chakra-ui/styled-system"
import {
  createContext,
  Dict,
  memoizedGet as get,
  runIfFn,
} from "@chakra-ui/utils"
import { Global, Interpolation, ThemeContext } from "@emotion/react"
import * as React from "react"

export { ThemeProvider, ThemeProviderProps } from "@emotion/react"

export function useTheme<T extends object = Dict>() {
  const theme = React.useContext(
    (ThemeContext as unknown) as React.Context<T | undefined>,
  )
  if (!theme) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />`",
    )
  }

  return theme
}

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ",
})

export { StylesProvider, useStyles }

/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */
export const GlobalStyle = () => {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={(theme) => {
        const styleObjectOrFn = get(theme, "styles.global")
        const globalStyles = runIfFn(styleObjectOrFn, { theme, colorMode })
        if (!globalStyles) return undefined
        const styles = css(globalStyles)(theme)
        return styles as Interpolation<{}>
      }}
    />
  )
}
