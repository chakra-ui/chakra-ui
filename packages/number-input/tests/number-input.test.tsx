import {
  testA11y,
  fireEvent,
  render,
  renderHook,
  userEvent,
  press,
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

test("should render correctly", () => {
  const { asFragment } = renderComponent()

  expect(asFragment()).toMatchSnapshot()
})

test("passes a11y test", async () => {
  const { container } = renderComponent()

  await testA11y(container)
})

test("should start with empty string", () => {
  const { result } = renderHook(() => useNumberInput())
  expect(result.current.value).toBe("")
})

test("should increment on press increment button", () => {
  const { getByTestId } = renderComponent()

  const upBtn = getByTestId("up-btn")
  const input = getByTestId("input")

  fireEvent.mouseDown(upBtn)
  // since the input's value is empty, this will set it to `step`
  // which is `1` by default
  expect(input).toHaveValue("1")

  fireEvent.mouseDown(upBtn)
  expect(input).toHaveValue("2")
})

test("should increase/decrease with keyboard", () => {
  const { getByTestId } = renderComponent()

  const input = getByTestId("input")

  input.focus()

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
  const { getByTestId } = renderComponent({ defaultValue: 0 })

  const input = getByTestId("input")

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
  const { getByTestId } = renderComponent({
    defaultValue: 0,
    step: 0.1,
    precision: 2,
  })

  const input = getByTestId("input")

  press.ArrowUp(input)
  expect(input).toHaveValue("0.10")
  press.ArrowUp(input, { ctrlKey: true })
  expect(input).toHaveValue("0.11")

  press.ArrowDown(input, { ctrlKey: true })
  expect(input).toHaveValue("0.10")
  press.ArrowDown(input)
  expect(input).toHaveValue("0.00")
})

it("should behave properly precision value", () => {
  const { getByTestId } = renderComponent({
    defaultValue: 0,
    step: 0.65,
    precision: 2,
  })

  const input = getByTestId("input")
  const incBtn = getByTestId("up-btn")
  const decBtn = getByTestId("down-btn")

  expect(input).toHaveValue("0.00")
  userEvent.click(incBtn)
  expect(input).toHaveValue("0.65")
  userEvent.click(incBtn)
  expect(input).toHaveValue("1.30")
  userEvent.click(incBtn)
  expect(input).toHaveValue("1.95")
  userEvent.click(decBtn)
  expect(input).toHaveValue("1.30")
})

test("should call onChange on value change", () => {
  const onChange = jest.fn()
  const { getByTestId } = renderComponent({ onChange })

  const upBtn = getByTestId("up-btn")

  userEvent.click(upBtn)

  expect(onChange).toBeCalled()
  expect(onChange).toBeCalledWith("1", 1)
})

test("should constrain value onBlur", () => {
  const { getByTestId } = renderComponent({ max: 30 })

  const input = getByTestId("input")

  userEvent.type(input, "34.55")

  // value is beyond max so it should reset to `max`
  fireEvent.blur(input)

  expect(input).toHaveValue("30.00")
})

test("should focus input on spin", () => {
  const { getByTestId } = renderComponent()

  const input = getByTestId("input")
  const upBtn = getByTestId("up-btn")

  fireEvent.mouseDown(upBtn)
  expect(input).toHaveValue("1")

  // for some reason, .toHaveFocus assertion doesn't work
  // expect(tools.getByTestId("input")).toEqual(document.activeElement)
})
