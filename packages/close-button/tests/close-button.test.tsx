import React from "react"
import { render, testA11Y } from "@chakra-ui/test-utils"
import { CloseButton } from "../src"

describe("<CloseButton />", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<CloseButton />)
    expect(asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11Y(<CloseButton />)
  })

  test("has the proper aria attributes", () => {
    const { getByLabelText } = render(<CloseButton />)
    getByLabelText("Close")
  })
})
