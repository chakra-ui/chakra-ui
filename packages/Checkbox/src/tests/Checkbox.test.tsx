import React from "react"
import { userEvent, render } from "@chakra-ui/test-utils"
import { Checkbox, CheckboxHiddenInput, CustomCheckbox } from "../Checkbox.base"

test("Checkbox renders correctly", () => {
  const utils = render(
    <Checkbox>
      <CheckboxHiddenInput />
      <CustomCheckbox>This is custom checkbox</CustomCheckbox>
    </Checkbox>,
  )
  expect(utils.asFragment()).toMatchSnapshot()
})

test("Uncontrolled - should check and uncheck", () => {
  const utils = render(
    <Checkbox>
      <CheckboxHiddenInput data-testid="input" />
      <CustomCheckbox>Checkbox</CustomCheckbox>
    </Checkbox>,
  )

  const input = utils.getByTestId("input")
  const checkbox = utils.getByText("Checkbox")

  // click the first time, it's checked
  userEvent.click(checkbox)
  expect(input).toBeChecked()
  expect(checkbox).toHaveAttribute("data-checked")

  // click the second time, it's unchecked
  userEvent.click(checkbox)
  expect(input).not.toBeChecked()
  expect(checkbox).not.toHaveAttribute("data-checked")
})

test("Uncontrolled - should not check if disabled", () => {
  const utils = render(
    <Checkbox isDisabled>
      <CheckboxHiddenInput data-testid="input" />
      <CustomCheckbox>Checkbox</CustomCheckbox>
    </Checkbox>,
  )

  const input = utils.getByTestId("input")
  const checkbox = utils.getByText("Checkbox")

  expect(input).toBeDisabled()
  expect(checkbox).toHaveAttribute("data-disabled")

  userEvent.click(checkbox)

  expect(input).not.toBeChecked()
  expect(checkbox).not.toHaveAttribute("data-checked")
})
