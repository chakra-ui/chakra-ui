import { ColorModeProvider, useColorMode } from "@chakra-ui/color-mode"
import { css, SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext, Dict, get, merge, runIfFn } from "@chakra-ui/utils"
import { Global, Interpolation, ThemeContext } from "@emotion/core"
import * as React from "react"

export interface ThemeProviderProps {
  children?: React.ReactNode
  theme: Dict
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme } = props
  const outerTheme = React.useContext(ThemeContext) as Dict
  const mergedTheme = merge({}, outerTheme, theme)

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

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

export type ChakraProviderProps = ThemeProviderProps

export function ChakraProvider(props: ChakraProviderProps) {
  const { theme, children } = props

  if (!theme) {
    throw Error("ChakraProvider: the `theme` prop is required")
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        defaultValue={theme?.config?.initialColorMode}
        useSystemColorMode={theme?.config?.useInitialColorMode}
      >
        <GlobalStyle />
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const [StylesProvider, useStyles] = createContext<Dict<SystemStyleObject>>({
  name: "StylesContext",
  errorMessage:
    "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` ",
})

export { StylesProvider, useStyles }

export function GlobalStyle() {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={(theme) => {
        const styleObjectOrFn = get(theme, "styles.global")
        const bodyStyles = runIfFn(styleObjectOrFn, { theme, colorMode })
        if (!bodyStyles) return
        const styles = css({ body: bodyStyles })(theme)
        return styles as Interpolation
      }}
    />
  )
}
