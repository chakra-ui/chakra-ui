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
  const { getByRole } = render(
    <ButtonGroup spacing="4rem">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>,
  )
  expect(getByRole("button", { name: "Button 2" })).toHaveStyle({
    marginInlineStart: "4rem",
  })
})
test("Should flush button", () => {
  const { getByRole } = render(
    <ButtonGroup isAttached>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </ButtonGroup>,
  )
  expect(getByRole("button", { name: "Button 1" })).toHaveStyle({
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  })
  expect(getByRole("button", { name: "Button 2" })).toHaveStyle({
    borderRadius: "0px",
  })
  expect(getByRole("button", { name: "Button 3" })).toHaveStyle({
    borderRadius: "0px",
  })
  expect(getByRole("button", { name: "Button 4" })).toHaveStyle({
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  })
})

test("Should flush outline button", () => {
  const { getByRole } = render(
    <ButtonGroup isAttached variant="outline">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </ButtonGroup>,
  )
  expect(getByRole("button", { name: "Button 1" })).toHaveStyle({
    marginInlineEnd: "-1px",
  })
  expect(getByRole("button", { name: "Button 2" })).toHaveStyle({
    marginInlineEnd: "-1px",
  })
  expect(getByRole("button", { name: "Button 3" })).toHaveStyle({
    marginInlineEnd: "-1px",
  })
  expect(getByRole("button", { name: "Button 4" })).toHaveStyle({
    marginInlineEnd: "",
  })
})
