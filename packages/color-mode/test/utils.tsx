/* eslint-disable global-require */
import { screen } from "@chakra-ui/test-utils"
import * as React from "react"

export const DummyComponent = () => {
  const { useColorMode } = require("../src/color-mode-provider")
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <button type="button" onClick={toggleColorMode}>
      {colorMode}
    </button>
  )
}

let renderCount = 0

export const resetCounter = () => {
  renderCount = 0
}

export const MemoizedComponent = React.memo(() => {
  renderCount++
  return <div data-testid="rendered">{renderCount}</div>
})

export const RegularComponent = () => {
  renderCount++
  return <div data-testid="rendered">{renderCount}</div>
}

export const getColorModeButton = () => screen.getByRole("button")

export const defaultThemeOptions = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra",
} as const

export function mockMatchMedia(query: string) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => {
      return {
        matches: query === "dark",
        media: "(prefers-color-scheme: dark)",
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    },
  })
}

export function mockLocalStorage(colorMode: string) {
  Object.defineProperty(window, "localStorage", {
    writable: true,
    value: {
      getItem: () => colorMode,
      setItem: jest.fn(),
    },
  })
}

export function mockCookieStorage(colorMode: string | null) {
  Object.defineProperty(document, "cookie", {
    writable: true,
    value: colorMode ? `chakra-ui-color-mode=${colorMode}` : "",
  })
}
