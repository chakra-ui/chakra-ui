import theme from "@chakra-ui/theme"
import { screen } from "@testing-library/react"
import React from "react"
import { ColorModeOptions } from "../src/color-mode-provider"
import type { ColorMode } from "../src/color-mode.utils"
import type { StorageManager } from "../src/storage-manager"

export const DummyComponent = () => {
  const { useColorMode } = require("../src/color-mode-provider")
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <button type="button" onClick={toggleColorMode}>
      {colorMode}
    </button>
  )
}

var renderCount = 0

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
