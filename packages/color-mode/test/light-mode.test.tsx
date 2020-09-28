import React from "react"
import { render } from "@testing-library/react"
import { LightMode } from "../src/color-mode-provider"
import { DummyComponent, getColorModeButton } from "./utils"
import userEvent from "@testing-library/user-event"

describe("<DarkMode />", () => {
  test("is always dark", () => {
    render(
      <LightMode>
        <DummyComponent />
      </LightMode>,
    )

    const button = getColorModeButton()

    expect(button).toHaveTextContent("light")

    userEvent.click(button)

    expect(getColorModeButton()).toHaveTextContent("light")
  })
})
