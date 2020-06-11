import { ColorModeProvider } from "@chakra-ui/color-mode"
import { createContext } from "@chakra-ui/utils"
import { ThemeContext } from "@emotion/core"
import * as React from "react"
import { ThemingProps } from "./system.types"
import { GlobalStyle } from "./global"

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
    throw Error("useTheme must be used within a ThemeProvider")
  }

  return theme
}

export type ChakraProviderProps = ThemeProviderProps

export function ChakraProvider(props: ChakraProviderProps) {
  const { theme, children } = props
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <GlobalStyle />
        {children}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const [ThemingProvider, useThemingContext] = createContext<ThemingProps>({
  strict: false,
  name: "ThemingContext",
})

export { ThemingProvider, useThemingContext }
