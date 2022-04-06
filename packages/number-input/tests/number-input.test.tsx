/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control"
import {
  act,
  testA11y,
  fireEvent,
  render,
  renderHook,
  userEvent,
  press,
  screen,
} from "@chakra-ui/test-utils"
import * as React from "react"

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  useNumberInput,
} from "../src"

function renderComponent(props: NumberInputProps = {}) {
  return render(
    <>
      <label htmlFor="input">Select number:</label>
      <NumberInput id="input" data-testid="root" {...props}>
        <NumberInputField data-testid="input" />
        <NumberInputStepper data-testid="group">
          <NumberIncrementStepper children="+" data-testid="up-btn" />
          <NumberDecrementStepper children="-" data-testid="down-btn" />
        </NumberInputStepper>
      </NumberInput>
    </>,
  )
}

/**
 * Get some inspiration here
 * https://github.com/palantir/blueprint/blob/3aa56473d253f5287e0960759bee367a9ff3e045/packages/core/test/controls/numericInputTests.tsx
 * https://github.com/deberoppa7/react-numeric-input/blob/master/src/index.test.js
 */

test("passes a11y test", async () => {
  const { container } = renderComponent()
  await testA11y(container)
})

test("should start with empty string", () => {
  const { result } = renderHook(() => useNumberInput())
  expect(result.current.value).toBe("")
})

test("should increment on press increment button", () => {
  renderComponent()

  const upBtn = screen.getByTestId("up-btn")
  const input = screen.getByTestId("input")

  act(() => {
    fireEvent.pointerDown(upBtn)
  })
  // since the input's value is empty, this will set it to `step`
  // which is `1` by default
  expect(input).toHaveValue("1")

  act(() => {
    fireEvent.pointerDown(upBtn)
  })
  expect(input).toHaveValue("2")
})

test("should increase/decrease with keyboard", () => {
  renderComponent()

  const input = screen.getByTestId("input")

  act(() => input.focus())

  press.ArrowUp(input)
  press.ArrowUp(input)
  press.ArrowUp(input)
  expect(input).toHaveValue("3")

  press.ArrowDown(input)
  press.ArrowDown(input)
  press.ArrowDown(input)
  expect(input).toHaveValue("0")

  press.ArrowUp(input)
  expect(input).toHaveValue("1")

  press.Home(input)
  expect(input).toHaveValue("-9007199254740991")

  press.End(input)
  expect(input).toHaveValue("9007199254740991")
})

test("should increase/decrease by 10*step on shift+Arrow", () => {
  renderComponent({ defaultValue: 0 })

  const input = screen.getByTestId("input")

  press.ArrowUp(input)
  expect(input).toHaveValue("1")
  press.ArrowUp(input, { shiftKey: true })
  expect(input).toHaveValue("11")

  press.ArrowDown(input, { shiftKey: true })
  expect(input).toHaveValue("1")
  press.ArrowDown(input)
  expect(input).toHaveValue("0")
})

test("should increase/decrease by 0.1*step on ctrl+Arrow", () => {
  renderComponent({
    defaultValue: 0,
    step: 0.1,
    precision: 2,
  })

  const input = screen.getByTestId("input")

  press.ArrowUp(input)
  expect(input).toHaveValue("0.10")
  press.ArrowUp(input, { ctrlKey: true })
  expect(input).toHaveValue("0.11")

  press.ArrowDown(input, { ctrlKey: true })
  expect(input).toHaveValue("0.10")
  press.ArrowDown(input)
  expect(input).toHaveValue("0.00")
})

it("should behave properly with precision value", async () => {
  renderComponent({
    defaultValue: 0,
    step: 0.65,
    precision: 2,
  })

  const input = screen.getByTestId("input")
  const incBtn = screen.getByTestId("up-btn")
  const decBtn = screen.getByTestId("down-btn")

  expect(input).toHaveValue("0.00")
  await userEvent.click(incBtn)
  expect(input).toHaveValue("0.65")
  await userEvent.click(incBtn)
  expect(input).toHaveValue("1.30")
  await userEvent.click(incBtn)
  expect(input).toHaveValue("1.95")
  await userEvent.click(decBtn)
  expect(input).toHaveValue("1.30")

  // on blur, value is clamped using precision
  await userEvent.type(input, "1234")
  expect(input).toHaveValue("1.301234")
  act(() => {
    fireEvent.blur(input)
  })
  expect(input).toHaveValue("1.30")
})

test("should call onChange on value change", async () => {
  const onChange = jest.fn()
  renderComponent({ onChange })

  const upBtn = screen.getByTestId("up-btn")

  await userEvent.click(upBtn)

  expect(onChange).toBeCalled()
  expect(onChange).toBeCalledWith("1", 1)
})

test("should constrain value onBlur", async () => {
  renderComponent({ max: 30 })

  const input = screen.getByTestId("input")

  await userEvent.type(input, "34.55")

  // value is beyond max so it should reset to `max`
  act(() => {
    fireEvent.blur(input)
  })

  expect(input).toHaveValue("30.00")
})

test("should focus input on spin", () => {
  renderComponent()

  const input = screen.getByTestId("input")
  const upBtn = screen.getByTestId("up-btn")

  act(() => {
    fireEvent.pointerDown(upBtn)
  })
  expect(input).toHaveValue("1")

  // for some reason, .toHaveFocus assertion doesn't work
  // expect(tools.getByTestId("input")).toEqual(document.activeElement)
})

test("should derive values from surrounding FormControl", () => {
  const onFocus = jest.fn()
  const onBlur = jest.fn()

  render(
    <FormControl
      id="input"
      isRequired
      isInvalid
      isDisabled
      isReadOnly
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <FormLabel>Number</FormLabel>
      <NumberInput data-testid="root">
        <NumberInputField data-testid="input" />
        <NumberInputStepper data-testid="group">
          <NumberIncrementStepper children="+" data-testid="up-btn" />
          <NumberDecrementStepper children="-" data-testid="down-btn" />
        </NumberInputStepper>
      </NumberInput>
      <FormHelperText>Select a number</FormHelperText>
    </FormControl>,
  )

  const input = screen.getByTestId("input")

  expect(input).toHaveAttribute("id", "input")
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-required", "true")
  expect(input).toHaveAttribute("aria-readonly", "true")
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-describedby")

  act(() => {
    fireEvent.focus(input)
  })
  expect(onFocus).toHaveBeenCalled()

  act(() => {
    fireEvent.blur(input)
  })
  expect(onBlur).toHaveBeenCalled()
})

test("should fallback to min if `e` is typed", async () => {
  renderComponent({ max: 30, min: 1 })
  const input = screen.getByTestId("input")
  await userEvent.type(input, "e")
  // value is beyond max so it should reset to `max`
  act(() => {
    fireEvent.blur(input)
  })
  expect(input).toHaveValue("1")
})
