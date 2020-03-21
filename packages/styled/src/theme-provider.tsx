import { ThemeContext } from "@emotion/core"
import * as React from "react"

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
