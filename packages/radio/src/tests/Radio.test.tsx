import * as React from "react"
import { render, fireEvent } from "@chakra-ui/test-utils"
import { Radio, useRadio, UseRadioProps } from ".."

test("Radio renders correctly", () => {
  const { asFragment } = render(<Radio size="lg" colorScheme="blue" />)
  expect(asFragment()).toMatchSnapshot()
})

test("has proper aria and data attributes", async () => {
  const Component = (props: UseRadioProps = {}) => {
    const { getCheckboxProps, getInputProps } = useRadio(props)

    return (
      <label>
        <input data-testid="input" {...getInputProps()} />
        <div data-testid="checkbox" {...getCheckboxProps()} />
      </label>
    )
  }
  const utils = render(<Component name="name" value="" id="id" />)
  const input = utils.getByTestId("input")
  const checkbox = utils.getByTestId("checkbox")

  expect(input).toHaveAttribute("name", "name")
  expect(input).toHaveAttribute("id", "id")
  expect(input).toHaveAttribute("value", "")
  expect(input).not.toBeDisabled()
  expect(input).not.toHaveAttribute("aria-required")
  expect(input).not.toHaveAttribute("aria-invalid")
  expect(input).not.toHaveAttribute("aria-disabled")
  expect(checkbox).toHaveAttribute("aria-hidden", "true")
  expect(checkbox).not.toHaveAttribute("data-active")
  expect(checkbox).not.toHaveAttribute("data-hover")
  expect(checkbox).not.toHaveAttribute("data-checked")
  expect(checkbox).not.toHaveAttribute("data-focus")
  expect(checkbox).not.toHaveAttribute("data-readonly")

  // render with various flags enabled
  utils.rerender(<Component isDisabled isInvalid isReadOnly isRequired />)

  expect(input).toHaveAttribute("aria-required")
  expect(input).toHaveAttribute("aria-invalid")
  expect(input).toHaveAttribute("aria-disabled")
  expect(input).toBeDisabled()
  expect(checkbox).toHaveAttribute("data-readonly")

  // input is not truly disabled if focusable
  utils.rerender(<Component isDisabled isFocusable />)
  expect(input).not.toBeDisabled()
})

test("handles events and callbacks correctly", () => {
  const hookProps = { onChange: jest.fn() }
  const checkboxProps = {
    onPointerDown: jest.fn(),
    onPointerUp: jest.fn(),
  }
  const inputProps = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onKeyDown: jest.fn(),
    onKeyUp: jest.fn(),
  }
  const Component = () => {
    const { getCheckboxProps, getInputProps } = useRadio(hookProps)

    return (
      <label>
        <input data-testid="input" {...getInputProps(inputProps)} />
        <div data-testid="checkbox" {...getCheckboxProps(checkboxProps)} />
      </label>
    )
  }
  const utils = render(<Component />)
  const input = utils.getByTestId("input")
  const checkbox = utils.getByTestId("checkbox")

  // pointer up and down
  fireEvent.pointerDown(checkbox)
  expect(checkbox).toHaveAttribute("data-active")
  expect(checkboxProps.onPointerDown).toHaveBeenCalled()

  fireEvent.pointerUp(checkbox)
  expect(checkbox).not.toHaveAttribute("data-active")
  expect(checkboxProps.onPointerUp).toHaveBeenCalled()

  // pointer enter and leave should be tested here, but I'm not sure they're
  // correctly supported in jsdom. was unable to get `fireEvent.pointerEnter` or
  // `fireEvent.pointerLeave` to have any effect whatsoever.

  // on change
  fireEvent.click(input)
  expect(input).toBeChecked()
  expect(checkbox).toHaveAttribute("data-checked")
  expect(hookProps.onChange).toHaveBeenCalled()
  expect(inputProps.onChange).toHaveBeenCalled()

  // blur and focus
  fireEvent.focus(input)
  expect(checkbox).toHaveAttribute("data-focus")
  expect(inputProps.onFocus).toHaveBeenCalled()

  fireEvent.blur(input)
  expect(checkbox).not.toHaveAttribute("data-focus")
  expect(inputProps.onFocus).toHaveBeenCalled()

  // key down and key up
  fireEvent.keyDown(input, { key: " ", keyCode: 32 })
  expect(checkbox).toHaveAttribute("data-active")
  expect(inputProps.onKeyDown).toHaveBeenCalled()

  fireEvent.keyUp(input, { key: " ", keyCode: 32 })
  expect(checkbox).not.toHaveAttribute("data-active")
  expect(inputProps.onKeyUp).toHaveBeenCalled()
})
