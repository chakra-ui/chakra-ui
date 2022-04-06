import { testA11y, render, screen } from "@chakra-ui/test-utils"
import * as React from "react"

import { Button, ButtonGroup } from "../src"

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

test("Should apply spacing", () => {
  render(
    <ButtonGroup spacing="4rem">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>,
  )

  expect(screen.getByText(/Button 2/i)).toHaveStyle({
    marginInlineStart: "4rem",
  })
})
test("Should flush button", () => {
  render(
    <ButtonGroup isAttached>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </ButtonGroup>,
  )

  expect(screen.getByText(/Button 1/i)).toHaveStyle({
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  })
  expect(screen.getByText(/Button 2/i)).toHaveStyle({
    borderRadius: "0px",
  })
  expect(screen.getByText(/Button 3/i)).toHaveStyle({
    borderRadius: "0px",
  })
  expect(screen.getByText(/Button 4/i)).toHaveStyle({
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  })

  // expect(getByText(/Button 1/i)).toHaveStyle({ borderStartRadius: "0" })
})
