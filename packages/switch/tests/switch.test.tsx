import * as React from "react"
import { userEvent, render } from "@chakra-ui/test-utils"
import { Switch } from "../src"

test("Switch renders correctly", () => {
  const utils = render(<Switch />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("Uncontrolled - should check and uncheck", () => {
  const { container } = render(<Switch />)
  const input = container.querySelector("input") as HTMLInputElement

  userEvent.click(input)
  expect(input).toBeChecked()

  userEvent.click(input)
  expect(input).not.toBeChecked()
})

test("Uncontrolled - should not check if disabled", () => {
  const { container } = render(<Switch isDisabled />)
  const input = container.querySelector("input") as HTMLInputElement

  expect(input).toBeDisabled()

  userEvent.click(input)
  expect(input).not.toBeChecked()
})

test("Controlled - should check and uncheck", () => {
  const ControlledSwitch = ({ onChange }: any) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        isChecked={checked}
        onChange={(e) => {
          onChange?.()
          setChecked(e.target.checked)
        }}
      />
    )
  }

  const onChange = jest.fn()

  const { container } = render(<ControlledSwitch onChange={onChange} />)

  const input = container.querySelector("input") as HTMLInputElement

  expect(input).not.toBeChecked()

  userEvent.click(input)

  expect(input).toBeChecked()
  expect(onChange).toHaveBeenCalled()

  userEvent.click(input)

  expect(input).not.toBeChecked()
  expect(onChange).toHaveBeenCalled()
})
