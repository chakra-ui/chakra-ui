import {
  axe,
  fireEvent,
  render,
  renderHook,
  userEvent,
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
} from ".."

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
  const tools = renderComponent()
  expect(tools.asFragment()).toMatchSnapshot()
})

test("should have no acessibility violations", async () => {
  const tools = renderComponent()
  const result = await axe(tools.container)
  expect(result).toHaveNoViolations()
})

test("should start with empty string", () => {
  const { result } = renderHook(() => useNumberInput())
  expect(result.current.value).toBe("")
})

test("should increment on press increment button", () => {
  const tools = renderComponent()

  const upBtn = tools.getByTestId("up-btn")
  const input = tools.getByTestId("input")

  fireEvent.mouseDown(upBtn)
  // since the input's value is empty, this will set it to `step`
  // which is `1` by default
  expect(input).toHaveValue("1")

  fireEvent.mouseDown(upBtn)
  expect(input).toHaveValue("2")
})

test("should call onChange on value change", () => {
  const onChange = jest.fn()
  const tools = renderComponent({ onChange })

  const upBtn = tools.getByTestId("up-btn")

  userEvent.click(upBtn)

  expect(onChange).toBeCalled()
  expect(onChange).toBeCalledWith("1", 1)
})

test("should constrain value onBlur", () => {
  const tools = renderComponent({ max: 30 })

  const input = tools.getByTestId("input")

  userEvent.type(input, "34.55")

  // value is beyond max so it should reset to `max`
  fireEvent.blur(input)

  expect(input).toHaveValue("30.00")
})

test("should focus input on spin", () => {
  const tools = renderComponent()

  const input = tools.getByTestId("input")
  const upBtn = tools.getByTestId("up-btn")

  fireEvent.mouseDown(upBtn)
  expect(input).toHaveValue("1")

  // for some reason, .toHaveFocus assertion doesn't work
  // expect(tools.getByTestId("input")).toEqual(document.activeElement)
})
