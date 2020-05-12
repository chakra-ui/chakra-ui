import { ThemeContext } from "@emotion/core"
import * as React from "react"
import { Dict } from "@chakra-ui/utils"
import { GlobalStyle } from "./global"
import { ColorModeProvider } from "@chakra-ui/color-mode"
import CSSReset from "@chakra-ui/css-reset"

export type ThemeProviderProps = {
  children?: React.ReactNode
  theme: object
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme } = props
  const outerTheme = React.useContext(ThemeContext)
  const mergedTheme = { ...outerTheme, ...theme }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme<T extends object = object>() {
  const theme = React.useContext(
    (ThemeContext as unknown) as React.Context<T | undefined>,
  )
  if (!theme) {
    throw Error("useTheme must be within a ThemeProvider")
  }

  return theme
}

export type ChakraProviderProps = {
  theme: Dict
  children: React.ReactNode
  includeCSSReset?: boolean
  includeColorMode?: boolean
}

export function ChakraProvider(props: ChakraProviderProps) {
  const {
    children,
    theme,
    includeCSSReset = true,
    includeColorMode = true,
  } = props

  const ModeProvider = includeColorMode ? ColorModeProvider : React.Fragment

  return (
    <ThemeProvider theme={theme}>
      <ModeProvider>
        {includeCSSReset && <CSSReset />}
        <GlobalStyle />
        {children}
      </ModeProvider>
    </ThemeProvider>
  )
}
