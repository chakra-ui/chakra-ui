import { userEvent, render, renderHook, fireEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import { useNumberInput } from "../NumberInput.hook"
import {
  BaseNumberInput,
  BaseNumberInputField,
  BaseDecrementStepper,
  BaseIncrementStepper,
  BaseStepperGroup,
  BaseNumberInputProps,
} from "../NumberInput.base"

function Component(props: BaseNumberInputProps) {
  return (
    <BaseNumberInput data-testid="root" {...props}>
      <BaseNumberInputField data-testid="input" />
      <BaseStepperGroup data-testid="group">
        <BaseIncrementStepper children="+" data-testid="up-btn" />
        <BaseDecrementStepper children="-" data-testid="down-btn" />
      </BaseStepperGroup>
    </BaseNumberInput>
  )
}

// https://github.com/palantir/blueprint/blob/3aa56473d253f5287e0960759bee367a9ff3e045/packages/core/test/controls/numericInputTests.tsx

test("it renders correctly", () => {
  const utils = render(<Component />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("has value of 0 by default", () => {
  const { result } = renderHook(() => useNumberInput())
  expect(result.current.value).toBe(0)
})

test("should increment when I press increment button", () => {
  const utils = render(<Component />)

  const upBtn = utils.getByTestId("up-btn")
  const input = utils.getByTestId("input")

  userEvent.click(upBtn)
  expect(input).toHaveValue("1")

  userEvent.dblClick(upBtn)
  expect(input).toHaveValue("3")
})

test("should call onChange on value change", () => {
  const onChange = jest.fn()
  const utils = render(<Component onChange={onChange} />)

  const upBtn = utils.getByTestId("up-btn")

  userEvent.click(upBtn)

  expect(onChange).toBeCalled()
  expect(onChange).toBeCalledWith(1, "1")
})

test("should constrain value onBlur", () => {
  const utils = render(<Component max={30} />)

  const input = utils.getByTestId("input")

  userEvent.type(input, "34.50")
  fireEvent.blur(input)

  expect(input).toHaveValue("30")
})
