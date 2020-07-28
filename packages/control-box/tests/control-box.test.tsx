import React from "react"
import { ControlBox } from "../src"
import { render, testA11Y } from "@chakra-ui/test-utils"

describe("<ControlBox />", () => {
  test("renders correctly", () => {
    render(<ControlBox>child</ControlBox>)
  })

  test("passes a11y test", async () => {
    await testA11Y(<ControlBox>child</ControlBox>)
  })

  test("matches snapshot", async () => {
    const { asFragment } = render(<ControlBox>child</ControlBox>)

    expect(asFragment()).toMatchSnapshot()
  })
})
