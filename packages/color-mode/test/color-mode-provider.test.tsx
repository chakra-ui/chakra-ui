import React from "react"
import * as colorModeUtils from "../src/color-mode.utils"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  defaultThemeOptions,
  DummyComponent,
  getColorModeButton,
} from "./utils"
import { ColorModeProvider } from "../src/color-mode-provider"

describe("<ColorModeProvider />", () => {
  test("sets class on body", () => {
    const syncBodyClassNameSpy = jest.spyOn(colorModeUtils, "syncBodyClassName")

    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(syncBodyClassNameSpy).toHaveBeenCalledTimes(1)
  })

  test("sets custom attribute on root", () => {
    const rootSpy = jest.spyOn(colorModeUtils.root, "set")

    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(rootSpy).toHaveBeenCalledTimes(1)
  })

  test("toggleColorMode changes the color", () => {
    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent(defaultThemeOptions.initialColorMode)

    userEvent.click(button)

    expect(getColorModeButton()).not.toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )
  })

  test("is controlled given a value", () => {
    const value = "dark"

    render(
      <ColorModeProvider options={defaultThemeOptions} value={value}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent(value)

    userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent(value)
  })
})
