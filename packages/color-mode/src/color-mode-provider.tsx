import { noop, __DEV__, isBrowser } from "@chakra-ui/utils"
import * as React from "react"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"

export type ColorMode = "light" | "dark"

export const ColorModeContext = React.createContext({} as ColorModeContextType)

if (__DEV__) {
  ColorModeContext.displayName = "ColorModeContext"
}

interface ColorModeContextType {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (value: ColorMode) => void
}

const classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark",
}

export const useColorMode = () => React.useContext(ColorModeContext)

const ssrBody = {
  classList: {
    add: () => {},
    remove: () => {},
  },
}

const body = isBrowser ? document?.body : ssrBody

export const ColorModeProvider: React.FC = (props) => {
  const { children } = props
  const [colorMode, rawSetColorMode] = React.useState<ColorMode>()

  useSafeLayoutEffect(() => {
    const root = document.documentElement
    const mode = root.style.getPropertyValue(
      "--chakra-ui-color-mode",
    ) as ColorMode
    rawSetColorMode(mode)
  }, [])

  useSafeLayoutEffect(() => {
    const dark = colorMode === "dark"
    body.classList.add(dark ? classNames.dark : classNames.light)
    body.classList.remove(dark ? classNames.light : classNames.dark)
  }, [colorMode])

  const ctx = React.useMemo(() => {
    const setColorMode = (mode: ColorMode) => {
      const root = document.documentElement
      root.style.setProperty("--chakra-ui-color-mode", mode)
      localStorage.setItem("chakra-ui-color-mode", mode)
      rawSetColorMode(mode)
    }

    const toggleColorMode = () => {
      setColorMode(colorMode === "light" ? "dark" : "light")
    }

    return {
      colorMode: colorMode as ColorMode,
      setColorMode,
      toggleColorMode,
    }
  }, [colorMode, rawSetColorMode])

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const shouldRef = React.useRef(false)

  React.useEffect(() => {
    if (!window.hasOwnProperty("matchMedia")) return

    const mq = window.matchMedia("(prefers-color-scheme: dark)")

    const listener = () => {
      if (shouldRef.current) {
        ctx.setColorMode(!!mq.matches ? "dark" : "light")
      }
      shouldRef.current = true
    }

    listener()
    mq.addListener(listener)

    return () => {
      mq.removeListener(listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ColorModeContext.Provider value={ctx}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ColorModeContext.Provider>
  )
}

if (__DEV__) {
  ColorModeProvider.displayName = "ColorModeProvider"
}

export const DarkMode: React.FC = ({ children }) => (
  <ColorModeContext.Provider
    value={{ colorMode: "dark", toggleColorMode: noop, setColorMode: noop }}
    children={children}
  />
)

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

export const LightMode: React.FC = ({ children }) => (
  <ColorModeContext.Provider
    value={{ colorMode: "light", toggleColorMode: noop, setColorMode: noop }}
    children={children}
  />
)

if (__DEV__) {
  LightMode.displayName = "LightMode"
}

/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */
export function useColorModeValue(light: any, dark: any) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}
