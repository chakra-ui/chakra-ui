import * as React from "react"
import theme from "@chakra-ui/theme"
import { screen } from "@testing-library/react"
import {
  useColorMode,
  ColorModeOptions,
  ColorMode,
  StorageManager,
} from "../src"

export const DummyComponent = () => {
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
