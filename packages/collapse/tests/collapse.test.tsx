import React from "react"
import { render, testA11Y } from "@chakra-ui/test-utils"
import { Collapse } from "../src"

describe("<Collapse />", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
    expect(asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11Y(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
  })
})
