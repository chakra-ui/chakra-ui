import React from "react"
import { render } from "@testing-library/react"
import {
  mockIsBrowser,
  createMockStorageManager,
  defaultThemeOptions,
  getColorModeButton,
  DummyComponent,
} from "./utils"
import * as colorModeUtils from "../src/color-mode.utils"

beforeEach(() => {
  jest.resetAllMocks()
  mockIsBrowser(true)
})

describe("<ColorModeProvider /> localStorage browser", () => {
  test("by default, picks from theme.config.initialColorMode", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorModeButton()).toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )
  })

  test("prefers useSystemColorMode over root property", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")
    const getColorSchemeSpy = jest
      .spyOn(colorModeUtils, "getColorScheme")
      .mockReturnValueOnce("dark")
    const rootGetSpy = jest.spyOn(colorModeUtils.root, "get")
    const mockLocalStorageManager = createMockStorageManager("localStorage")

    render(
      <ColorModeProvider
        options={{ ...defaultThemeOptions, useSystemColorMode: true }}
        colorModeManager={mockLocalStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorSchemeSpy).toHaveBeenCalledTimes(1)

    expect(rootGetSpy).not.toHaveBeenCalled()
    expect(mockLocalStorageManager.get).not.toHaveBeenCalled()

    expect(getColorModeButton()).not.toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )
  })

  test("prefers root property over localStorage", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const rootGetSpy = jest
      .spyOn(colorModeUtils.root, "get")
      // @ts-expect-error only happens if value doesn't exist, e.g. CSR
      .mockReturnValueOnce("")

    const mockLocalStorageManager = createMockStorageManager(
      "localStorage",
      "dark",
    )

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockLocalStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(rootGetSpy).toHaveBeenCalledTimes(1)
    expect(mockLocalStorageManager.get).toHaveBeenCalledTimes(1)

    expect(getColorModeButton()).not.toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )
  })
})
