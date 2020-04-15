import { useMediaQuery } from "@chakra-ui/hooks"
import * as React from "react"
import { useSyncBetweenTabs, useUpdateBodyClassName } from "./color-mode.hook"
import { ColorMode, darkModeQuery } from "./color-mode.utils"
import { __DEV__ } from "@chakra-ui/utils"

export { ColorMode }

type ColorModeContext = [ColorMode, () => void]

export const ColorModeContext = React.createContext<ColorModeContext>([
  "light",
  () => {},
])

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

export function useColorMode() {
  const context = React.useContext(ColorModeContext)
  if (context == null) {
    throw Error("useColorMode can only be used within ColorModeProvider")
  }
  return context
}

export interface ColorModeProviderProps {
  value?: ColorMode
  children?: React.ReactNode
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  const { children, value } = props

  const [isDark, setIsDark] = useMediaQuery(darkModeQuery)

  const colorMode: ColorMode = isDark ? "dark" : "light"
  const toggleColorMode = () => setIsDark(prev => !prev)

  useUpdateBodyClassName(isDark)
  useSyncBetweenTabs(setIsDark)

  const [manualMode, setManualMode] = React.useState<ColorMode | undefined>(
    value,
  )

  /**
   * In some cases, the user wants fully control the colormode
   * without using `useColorMode`, let's ensure we sync the value
   * prop with state.
   *
   * @see https://github.com/chakra-ui/chakra-ui/issues/573
   */
  React.useEffect(() => {
    setManualMode(value)
  }, [value])

  const manualToggle = () => {
    setManualMode(prev => (prev === "light" ? "dark" : "light"))
  }

  const context = value
    ? [manualMode, manualToggle]
    : [colorMode, toggleColorMode]

  const _context = React.useMemo(() => context, [context]) as ColorModeContext

  return <ColorModeContext.Provider value={_context} children={children} />
}

export const DarkMode = (props: ColorModeProviderProps) => (
  <ColorModeProvider value="dark" {...props} />
)
export const LightMode = (props: ColorModeProviderProps) => (
  <ColorModeProvider value="light" {...props} />
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
