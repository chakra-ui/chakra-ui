import React from "react"
import theme from "@chakra-ui/theme"
import { ColorModeOptions } from "../src/color-mode-provider"
import type { ColorMode } from "../src/color-mode.utils"
import { screen } from "@testing-library/react"
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

export const mockIsBrowser = (isBrowser: boolean) => {
  jest.mock("@chakra-ui/utils", () => {
    const actual = jest.requireActual("@chakra-ui/utils")

    return {
      ...actual,
      isBrowser,
    }
  })
}
