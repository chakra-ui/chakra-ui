import { useMediaQuery } from "@chakra-ui/hooks"
import * as React from "react"
import { useSyncBetweenTabs, useUpdateBodyClassName } from "./color-mode.hook"
import { ColorMode, darkModeQuery } from "./color-mode.utils"

export { ColorMode }

type ColorModeContext = [ColorMode, () => void]

const Context = React.createContext<ColorModeContext>(["light", () => {}])

export function useColorMode() {
  const context = React.useContext(Context)
  if (context == null) {
    throw Error("useColorMode can only be used within ColorModeProvider")
  }
  return context
}

export interface ColorModeProviderProps {
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

  const _context = context as ColorModeContext

  return <Context.Provider value={_context} children={children} />
}

export const DarkMode = (props: ColorModeProviderProps) => (
  <ColorModeProvider mode="dark" {...props} />
)
export const LightMode = (props: ColorModeProviderProps) => (
  <ColorModeProvider mode="light" {...props} />
)

export function getColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  return function(colorMode: ColorMode) {
    const value = { light: lightModeValue, dark: darkModeValue }
    return value[colorMode]
  }
}

export function useColorModeValue<T>(lightModeValue: T, darkModeValue: T) {
  const [colorMode] = useColorMode()
  return getColorModeValue(lightModeValue, darkModeValue)(colorMode)
}
