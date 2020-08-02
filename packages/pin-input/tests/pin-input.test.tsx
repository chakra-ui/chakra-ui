import * as React from "react"
import { render, userEvent, fireEvent } from "@chakra-ui/test-utils"
import {
  usePinInput,
  usePinInputField,
  UsePinInputProps,
  PinInputProvider,
} from "../src"

function Input(props: any) {
  const inputProps = usePinInputField(props)
  return <input {...inputProps} />
}

const Component = (props: UsePinInputProps = {}) => {
  const context = usePinInput(props)
  return (
    <PinInputProvider value={context}>
      <Input data-testid="1" />
      <Input data-testid="2" />
      <Input data-testid="3" />
    </PinInputProvider>
  )
}

test("PinInput renders correctly", () => {
  const Component = () => {
    const context = usePinInput()

    return (
      <PinInputProvider value={context}>
        <Input />
        <Input />
        <Input />
        <Input />
      </PinInputProvider>
    )
  }
  const { asFragment } = render(<Component />)

  expect(asFragment()).toMatchSnapshot()
})

test("has the proper aria attributes", () => {
  const utils = render(<Component />)

  expect(utils.queryAllByLabelText("Please enter your pin code")).toHaveLength(
    3,
  )
})

test("can autofocus the first field", () => {
  const utils = render(<Component autoFocus />)

  expect(document.activeElement).toEqual(utils.getByTestId("1"))
})

test("typing in an input automatically moves focus to the next item", () => {
  const utils = render(<Component />)

  userEvent.type(utils.getByTestId("1"), "1")
  expect(document.activeElement).toEqual(utils.getByTestId("2"))
  userEvent.type(utils.getByTestId("2"), "2")
  expect(document.activeElement).toEqual(utils.getByTestId("3"))
})

test("pressing backspace moves to the previous input and clears", () => {
  const utils = render(<Component />)

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
  const utils = render(<Component onComplete={onComplete} />)

  userEvent.type(utils.getByTestId("1"), "1")
  userEvent.type(utils.getByTestId("2"), "2")
  userEvent.type(utils.getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
})

test("can clear all input", () => {
  const Component = () => {
    const context = usePinInput()
    return (
      <PinInputProvider value={context}>
        <Input data-testid="1" />
        <Input data-testid="2" />
        <Input data-testid="3" />
        <button onClick={() => context.clear()}>Clear</button>
      </PinInputProvider>
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
