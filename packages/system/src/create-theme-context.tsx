import { ThemeContext } from "@emotion/core"
import * as React from "react"

export function createThemeContext<T extends object>(theme: T) {
  const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
    <ThemeContext.Provider value={theme} children={children} />
  )

  function useTheme() {
    const theme = React.useContext(
      (ThemeContext as unknown) as React.Context<T | undefined>,
    )
    if (!theme)
      throw new Error("useTheme must be within a ThemeProvider with a value")
    return theme
  }

  return [ThemeProvider, useTheme] as const
}

export default createThemeContext
