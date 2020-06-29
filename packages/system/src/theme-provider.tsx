import { ColorModeProvider } from "@chakra-ui/color-mode"
import { createContext, merge, Dict } from "@chakra-ui/utils"
import { ThemeContext } from "@emotion/core"
import * as React from "react"
import { ThemingProps } from "./system.types"
import { GlobalStyle } from "./global"

export interface ThemeProviderProps {
  children?: React.ReactNode
  theme: Dict
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme } = props
  const outerTheme = React.useContext(ThemeContext) as Dict
  const mergedTheme = merge(outerTheme, theme)

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
    throw Error("useTheme must be used within a ThemeProvider")
  }

  return theme
}

export type ChakraProviderProps = ThemeProviderProps

export function ChakraProvider(props: ChakraProviderProps) {
  const { theme, children } = props
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        defaultValue={theme.config?.initialColorMode}
        useSystemColorMode={theme.config?.useInitialColorMode}
      >
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
