import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { ColorModeProvider } from "../src"
import * as colorModeUtils from "../src/color-mode.utils"
import {
  defaultThemeOptions,
  DummyComponent,
  getColorModeButton,
} from "./utils"

describe("<ColorModeProvider />", () => {
  test("sets class on body", () => {
    const syncBodyClassNameSpy = jest.spyOn(colorModeUtils, "syncBodyClassName")

    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(syncBodyClassNameSpy).toHaveBeenCalled()
  })

  test("sets custom attribute on root", () => {
    const rootSpy = jest.spyOn(colorModeUtils.root, "set")

    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    expect(rootSpy).toHaveBeenCalled()
  })

  test("toggleColorMode changes the color", async () => {
    const { user } = render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent(defaultThemeOptions.initialColorMode)

    await user.click(button)

    expect(getColorModeButton()).not.toHaveTextContent(
      defaultThemeOptions.initialColorMode,
    )
  })

  test("is controlled given a value", async () => {
    const value = "dark"

    const { user } = render(
      <ColorModeProvider options={defaultThemeOptions} value={value}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent(value)

    await user.click(button)

    expect(getColorModeButton()).toHaveTextContent(value)
  })
})
