import { testA11y, render } from "@chakra-ui/test-utils"
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
  const { getByText } = render(
    <ButtonGroup spacing="4rem">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>,
  )
  expect(getByText(/Button 2/i)).toHaveStyle({ marginInlineStart: "4rem" })
})
test("Should flush button", () => {
  const { getByText } = render(
    <ButtonGroup isAttached>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </ButtonGroup>,
  )
  expect(getByText(/Button 1/i)).toHaveStyle({
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  })
  expect(getByText(/Button 2/i)).toHaveStyle({
    borderRadius: "0px",
  })
  expect(getByText(/Button 3/i)).toHaveStyle({
    borderRadius: "0px",
  })
  expect(getByText(/Button 4/i)).toHaveStyle({
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  })
})

test("Should flush outline button", () => {
  const { getByText } = render(
    <ButtonGroup isAttached variant="outline">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </ButtonGroup>,
  )
  expect(getByText(/Button 1/i)).toHaveStyle({
    marginInlineEnd: "-1px",
  })
  expect(getByText(/Button 2/i)).toHaveStyle({
    marginInlineEnd: "-1px",
  })
  expect(getByText(/Button 3/i)).toHaveStyle({
    marginInlineEnd: "-1px",
  })
  expect(getByText(/Button 4/i)).toHaveStyle({
    marginInlineEnd: "",
  })
})
