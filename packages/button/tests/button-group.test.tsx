import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { ButtonGroup, Button } from "../src"

describe("<ButtonGroup />", () => {
  test("ButtonGroup renders correctly", () => {
    const { asFragment } = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
      </ButtonGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
      </ButtonGroup>,
    )
  })
})
