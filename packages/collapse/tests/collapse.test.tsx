import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { Collapse } from "../src"

describe("<Collapse />", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
  })
})
