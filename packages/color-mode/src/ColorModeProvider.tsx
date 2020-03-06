import { useMediaQuery } from "@chakra-ui/hooks"
import * as React from "react"
import { useSyncBetweenTabs, useUpdateBodyClassName } from "./color-mode.hooks"
import { ColorMode, darkModeQuery } from "./color-mode.utils"

type ContextType = [ColorMode, () => void]

const Context = React.createContext<ContextType>(["light", () => {}])

export const useColorMode = () => {
  const context = React.useContext(Context)
  if (context === undefined) {
    throw Error("context is undefined")
  }
  return context
}

interface ColorModeProviderProps {
  mode?: ColorMode
  children?: React.ReactNode
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  const { children, mode } = props

  const [isDark, setIsDark] = useMediaQuery(darkModeQuery)

  const colorMode: ColorMode = isDark ? "dark" : "light"
  const toggleColorMode = () => setIsDark(prev => !prev)

  useUpdateBodyClassName(isDark)
  useSyncBetweenTabs(setIsDark)

  const [manualMode, setManualMode] = React.useState<ColorMode | undefined>(
    mode,
  )
  const manualToggle = () =>
    setManualMode(prev => (prev === "light" ? "dark" : prev))

  const context = mode
    ? [manualMode, manualToggle]
    : [colorMode, toggleColorMode]

  const _context = context as ContextType

  return <Context.Provider value={_context} children={children} />
}

export const DarkMode = (props: ColorModeProviderProps) => (
  <ColorModeProvider mode="dark" {...props} />
)
export const LightMode = (props: ColorModeProviderProps) => (
  <ColorModeProvider mode="light" {...props} />
)
