/* eslint-disable global-require */
import { mocks, screen } from "@chakra-ui/test-utils"
import * as React from "react"
import { useColorMode } from "./color-mode-context"

export const DummyComponent = () => {
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

export const MemoizedComponent = React.memo(function MemoizedComponent() {
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
  mocks.matchMedia("(prefers-color-scheme: dark)", query === "dark")
}

export function mockLocalStorage(colorMode: string) {
  mocks.localStorage(colorMode)
}

export function mockCookieStorage(colorMode: string | null) {
  mocks.cookie("chakra-ui-color-mode", colorMode)
}
