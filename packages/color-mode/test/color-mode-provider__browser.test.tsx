/* eslint-disable global-require */
import { act, cleanup, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as React from "react"
import { ColorModeProvider } from "../src"
import * as colorModeUtils from "../src/color-mode.utils"
import {
  createMockStorageManager,
  defaultThemeOptions,
  DummyComponent,
  getColorModeButton,
} from "./utils"

jest.mock("@chakra-ui/utils", () => ({
  ...jest.requireActual("@chakra-ui/utils"),
  isBrowser: true,
}))

beforeEach(() => {
  jest.resetAllMocks()
  cleanup()

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      if (query === "(prefers-color-scheme: dark)") {
        return {
          matches: false,
          media: "(prefers-color-scheme: dark)",
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        }
      }
    }),
  })
  document.documentElement.style.setProperty("--chakra-ui-color-mode", "")
})

describe("<ColorModeProvider /> localStorage browser", () => {
  it.each(
    [
      { system: "light", initial: "light", useSystem: false, expect: "light" },
      { system: "dark", initial: "light", useSystem: false, expect: "light" },
      //
      { system: "light", initial: "dark", useSystem: false, expect: "dark" },
      { system: "dark", initial: "dark", useSystem: false, expect: "dark" },
      { system: "light", initial: "system", useSystem: false, expect: "light" },
      //
      { system: "dark", initial: "system", useSystem: false, expect: "dark" },

      { system: "light", initial: "light", useSystem: true, expect: "light" },
      //
      { system: "dark", initial: "light", useSystem: true, expect: "dark" },
      { system: "light", initial: "dark", useSystem: true, expect: "light" },
      //
      { system: "dark", initial: "dark", useSystem: true, expect: "dark" },
      { system: "light", initial: "system", useSystem: true, expect: "light" },
      //
      { system: "dark", initial: "system", useSystem: true, expect: "dark" },
    ].map((item) => ({
      ...item,
      toString: () => `case: ${JSON.stringify(item)}`,
    })),
  )("%s", (result) => {
    const { ColorModeProvider } = require("../src/color-mode-provider")

    jest.spyOn(colorModeUtils.root, "set").mockImplementation(jest.fn())

    jest
      .spyOn(colorModeUtils.root, "get")
      // only happens if value doesn't exist
      .mockReturnValue("")
    const mockLocalStorageManager = createMockStorageManager(
      "localStorage",
      undefined,
    )
    const systemIsDarkMode = result.system === "dark"

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        if (query === "(prefers-color-scheme: dark)") {
          return {
            matches: systemIsDarkMode,
            media: "(prefers-color-scheme: dark)",
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
          }
        }
      }),
    })
    render(
      <ColorModeProvider
        options={{
          useSystemColorMode: result.useSystem,
          initialColorMode: result.initial,
        }}
        colorModeManager={mockLocalStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )
    expect(getColorModeButton()).toHaveTextContent(result.expect)
  })
})

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
  const rootGetSpy = jest
    .spyOn(colorModeUtils.root, "get")
    // only happens if value doesn't exist, e.g. CSR
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

test("onChange sets value to all listeners", () => {
  const rootSet = jest.spyOn(colorModeUtils.root, "set")

  const mockLocalStorageManager = createMockStorageManager("localStorage")

  render(
    <ColorModeProvider
      options={defaultThemeOptions}
      colorModeManager={mockLocalStorageManager}
    >
      <DummyComponent />
    </ColorModeProvider>,
  )

  expect(rootSet).toHaveBeenCalledTimes(1)
  expect(mockLocalStorageManager.set).not.toHaveBeenCalled()

  act(() => userEvent.click(getColorModeButton()))

  expect(rootSet).toHaveBeenCalledTimes(2)
  expect(rootSet).toHaveBeenCalledWith("dark")

  expect(mockLocalStorageManager.set).toHaveBeenCalledTimes(1)
  expect(mockLocalStorageManager.set).toHaveBeenCalledWith("dark")

  expect(getColorModeButton()).toHaveTextContent("dark")
})

describe("<ColorModeProvider /> cookie browser", () => {
  test("by default, picks from cookie", () => {
    const getColorSchemeSpy = jest
      .spyOn(colorModeUtils, "getColorScheme")
      .mockReturnValueOnce("dark")
    const rootGetSpy = jest.spyOn(colorModeUtils.root, "get")

    const mockCookieStorageManager = createMockStorageManager("cookie", "dark")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockCookieStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(getColorModeButton()).toHaveTextContent("dark")

    expect(getColorSchemeSpy).not.toHaveBeenCalled()
    expect(rootGetSpy).not.toHaveBeenCalled()
  })

  test("onChange sets value to all listeners", () => {
    const rootSet = jest.spyOn(colorModeUtils.root, "set")

    const mockCookieStorageManager = createMockStorageManager("cookie")

    render(
      <ColorModeProvider
        options={defaultThemeOptions}
        colorModeManager={mockCookieStorageManager}
      >
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(rootSet).toHaveBeenCalledTimes(1)
    expect(mockCookieStorageManager.set).not.toHaveBeenCalled()

    act(() => userEvent.click(getColorModeButton()))

    expect(rootSet).toHaveBeenCalledTimes(2)
    expect(rootSet).toHaveBeenCalledWith("dark")

    expect(mockCookieStorageManager.set).toHaveBeenCalledTimes(1)
    expect(mockCookieStorageManager.set).toHaveBeenCalledWith("dark")

    expect(getColorModeButton()).toHaveTextContent("dark")
  })
})
