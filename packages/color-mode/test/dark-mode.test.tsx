import React from "react"
import { render } from "@testing-library/react"
import { DarkMode } from "../src/color-mode-provider"
import { DummyComponent, getColorModeButton } from "./utils"
import userEvent from "@testing-library/user-event"

describe("<DarkMode />", () => {
  test("is always dark", () => {
    render(
      <DarkMode>
        <DummyComponent />
      </DarkMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("dark")

    userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent("dark")
  })
})
