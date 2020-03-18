import { ThemeContext } from "@emotion/core"
import * as React from "react"

export function createTheming<T extends object>(theme: T) {
  const ThemeProvider: React.FC = ({ children }) => {
    const outerTheme = React.useContext(ThemeContext)
    const mergedTheme = { ...outerTheme, ...theme }
    return <ThemeContext.Provider value={mergedTheme} children={children} />
  }

  function useTheme() {
    const theme = React.useContext(
      (ThemeContext as unknown) as React.Context<T | undefined>,
    )

    if (!theme) {
      throw Error("useTheme must be within a ThemeProvider")
    }

    return theme
  }

  return [ThemeProvider, useTheme] as const
}
