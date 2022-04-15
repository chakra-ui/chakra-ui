/* eslint-disable global-require */
import * as React from "react"
import { screen } from "@chakra-ui/test-utils"
import theme from "@chakra-ui/theme"
import { ColorModeOptions, ColorMode, StorageManager } from "../src"

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
  renderCount = renderCount + 1
  return <div data-testid="rendered">{renderCount}</div>
})

export const RegularComponent = () => {
  renderCount = renderCount + 1
  return <div data-testid="rendered">{renderCount}</div>
}

export const getColorModeButton = () => screen.getByRole("button")

export const defaultThemeOptions = theme.config as Required<ColorModeOptions>

export const createMockStorageManager = (
  type: StorageManager["type"],
  get?: ColorMode,
): StorageManager => {
  return {
    get: jest.fn().mockImplementation((init) => get ?? init),
    set: jest.fn(),
    type,
  }
}
