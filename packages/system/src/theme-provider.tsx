import { ThemeContext } from "@emotion/core"
import * as React from "react"

export type ThemeProviderProps<T extends object = object> = {
  children: React.ReactNode
  theme: T
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme} children={children} />
}

export function useTheme<T extends object = object>() {
  const theme = React.useContext(
    (ThemeContext as unknown) as React.Context<T | undefined>,
  )
  if (!theme)
    throw new Error("useTheme must be within a ThemeProvider with a value")
  return theme
}

export { ThemeContext }
