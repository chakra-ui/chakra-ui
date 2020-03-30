import * as React from "react"
import { render, userEvent, fireEvent } from "@chakra-ui/test-utils"
import { usePinInput, usePinInputField, PinInputHookProps } from ".."

const TestComponent = (contextProps: PinInputHookProps = {}) => {
  const context = usePinInput(contextProps)
  const input1 = usePinInputField({ context })
  const input2 = usePinInputField({ context })
  const input3 = usePinInputField({ context })

  return (
    <div>
      <input data-testid="1" {...input1} />
      <input data-testid="2" {...input2} />
      <input data-testid="3" {...input3} />
    </div>
  )
}

test("PinInput renders correctly", () => {
  const Component = () => {
    const context = usePinInput()
    const input1 = usePinInputField({ context })
    const input2 = usePinInputField({ context })
    const input3 = usePinInputField({ context })

    return (
      <div>
        <input {...input1} />
        <input {...input2} />
        <input {...input3} />
      </div>
    )
  }
  const { asFragment } = render(<Component />)

  expect(asFragment()).toMatchSnapshot()
})

test("has the proper aria attributes", () => {
  const utils = render(<TestComponent />)

  expect(utils.queryAllByLabelText("Please enter your pin code")).toHaveLength(
    3,
  )
})

test("can autofocus the first field", () => {
  const utils = render(<TestComponent autoFocus />)

  expect(document.activeElement).toEqual(utils.getByTestId("1"))
})

test("typing in an input automatically moves focus to the next item", () => {
  const utils = render(<TestComponent />)

  userEvent.type(utils.getByTestId("1"), "1")
  expect(document.activeElement).toEqual(utils.getByTestId("2"))
  userEvent.type(utils.getByTestId("2"), "2")
  expect(document.activeElement).toEqual(utils.getByTestId("3"))
})

test("pressing backspace moves to the previous input and clears", () => {
  const utils = render(<TestComponent />)

  // type in the first two inputs
  userEvent.type(utils.getByTestId("1"), "1")
  userEvent.type(utils.getByTestId("2"), "2")

  // verify that 3rd input is active
  expect(document.activeElement).toEqual(utils.getByTestId("3"))

  // send backspace to the 3rd input
  fireEvent.keyDown(utils.getByTestId("3"), { key: "Backspace" })

  // verify that 2nd input is active and value was cleared
  expect(document.activeElement).toEqual(utils.getByTestId("2"))
  expect(utils.getByTestId("2")).toHaveValue("")
})

test("filling out all inputs calls the complete callback", () => {
  const onComplete = jest.fn()
  const utils = render(<TestComponent onComplete={onComplete} />)

  userEvent.type(utils.getByTestId("1"), "1")
  userEvent.type(utils.getByTestId("2"), "2")
  userEvent.type(utils.getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
})

test("can clear all input", () => {
  const Component = () => {
    const context = usePinInput()
    const input1 = usePinInputField({ context })
    const input2 = usePinInputField({ context })
    const input3 = usePinInputField({ context })

    return (
      <div>
        <input data-testid="1" {...input1} />
        <input data-testid="2" {...input2} />
        <input data-testid="3" {...input3} />
        <button onClick={() => context.clear()}>Clear</button>
      </div>
    )
  }
  const utils = render(<Component />)

  // fill out the first two
  userEvent.type(utils.getByTestId("1"), "1")
  userEvent.type(utils.getByTestId("2"), "2")

  // click the clear button
  fireEvent.click(utils.getByText(/clear/i))

  // verify that input values are blank
  expect(utils.getByTestId("1")).toHaveValue("")
  expect(utils.getByTestId("2")).toHaveValue("")
})
