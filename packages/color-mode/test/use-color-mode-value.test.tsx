import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  ColorModeProvider,
  useColorModeValue,
  useColorMode,
} from "../src/color-mode-provider"
import { defaultThemeOptions } from "./utils"

const lightValue = "light-value"
const darkValue = "dark-value"

function DummyComponent() {
  const { colorMode, toggleColorMode } = useColorMode()
  const value = useColorModeValue(lightValue, darkValue)

  return (
    <>
      <h1 data-testid="mode">{colorMode}</h1>
      <button onClick={toggleColorMode}>{value}</button>
    </>
  )
}

describe("useColorModeValue", () => {
  test("given light mode, shows lightValue and toggles", () => {
    render(
      <ColorModeProvider options={defaultThemeOptions}>
        <DummyComponent />
      </ColorModeProvider>,
    )

    const button = screen.getByRole("button")

    expect(screen.getByTestId("mode")).toHaveTextContent("light")
    expect(button).toHaveTextContent(lightValue)

    userEvent.click(button)

    expect(screen.getByTestId("mode")).toHaveTextContent("dark")
    expect(button).toHaveTextContent(darkValue)
  })
})
