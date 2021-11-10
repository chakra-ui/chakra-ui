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
  mockIsBrowser(false)
})

describe("<ColorModeProvider /> localStorage server", () => {
  test("by default, picks from theme.config.initialColorMode only", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const mockLocalStorageManager = createMockStorageManager("localStorage")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockLocalStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorModeButton()).toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )

    expect(mockLocalStorageManager.get).not.toHaveBeenCalled()
  })

  test("adds a mediaQueryListener if theme.config.useSystemColorMode is true", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const addListenerSpy = jest.spyOn(colorModeUtils, "addListener")

    render(
      <ColorModeProvider
        options={{ ...defaultThemeOptions, useSystemColorMode: true }}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(addListenerSpy).toHaveBeenCalledTimes(1)
  })

  test("adds no mediaQueryListener if theme.config.useSystemColorMode is false", () => {
    mockIsBrowser(false)
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const addListenerSpy = jest.spyOn(colorModeUtils, "addListener")
    const mockLocalStorageManager = createMockStorageManager("localStorage")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockLocalStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(addListenerSpy).not.toHaveBeenCalled()
  })
})

describe("<ColorModeProvider /> cookie server", () => {
  test("by default, uses the cookie", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const mockCookieStorageManager = createMockStorageManager("cookie", "dark")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockCookieStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorModeButton()).not.toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )

    expect(mockCookieStorageManager.get).toHaveBeenCalledTimes(1)
  })

  test("by default, falls back to theme.config.initialColorMode if no cookie was found", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const mockCookieStorageManager = createMockStorageManager("cookie")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockCookieStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorModeButton()).toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )

    expect(mockCookieStorageManager.get).toHaveBeenCalledTimes(1)
    expect(mockCookieStorageManager.get).toHaveBeenCalledWith(
      defaultThemeOptions.initialColorMode,
    )
  })

  test("never calls localStorage effect-bound functions", () => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    const getColorSchemeSpy = jest.spyOn(colorModeUtils, "getColorScheme")
    const rootGetSpy = jest.spyOn(colorModeUtils.root, "get")

    const mockCookieStorageManager = createMockStorageManager("cookie")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockCookieStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorSchemeSpy).not.toHaveBeenCalled()
    expect(rootGetSpy).not.toHaveBeenCalled()
  })
})
