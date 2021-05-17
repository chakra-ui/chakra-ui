import * as React from "react"
import {
  render,
  userEvent,
  fireEvent,
  screen,
  waitFor,
} from "@chakra-ui/test-utils"
import {
  usePinInput,
  usePinInputField,
  UsePinInputProps,
  PinInputProvider,
  PinInputDescendantsProvider,
} from "../src"

function Input(props: any) {
  const inputProps = usePinInputField(props)
  return <input {...inputProps} />
}

const Component = (props: UsePinInputProps = {}) => {
  const { descendants, ...context } = usePinInput(props)
  return (
    <PinInputDescendantsProvider value={descendants}>
      <PinInputProvider value={context}>
        <Input data-testid="1" />
        <Input data-testid="2" />
        <Input data-testid="3" />
        <button onClick={() => context.clear()}>Clear</button>
      </PinInputProvider>
    </PinInputDescendantsProvider>
  )
}

test("has the proper aria attributes", () => {
  const utils = render(<Component />)
  expect(utils.queryAllByLabelText("Please enter your pin code")).toHaveLength(
    3,
  )
})

test("can autofocus the first field", async () => {
  const utils = render(<Component autoFocus />)
  await waitFor(() => expect(utils.getByTestId("1")).toHaveFocus())
})

test("typing in an input automatically moves focus to the next item", async () => {
  const utils = render(<Component />)

  userEvent.type(utils.getByTestId("1"), "1")
  await waitFor(() => expect(utils.getByTestId("2")).toHaveFocus())

  userEvent.type(utils.getByTestId("2"), "2")
  await waitFor(() => expect(utils.getByTestId("3")).toHaveFocus())
})

test("pressing backspace moves to the previous input and clears", async () => {
  const utils = render(<Component />)

  // type in the first two inputs
  userEvent.type(utils.getByTestId("1"), "1")
  userEvent.type(utils.getByTestId("2"), "2")

  // verify that 3rd input is active
  await waitFor(() => expect(utils.getByTestId("3")).toHaveFocus())

  // send backspace to the 3rd input
  fireEvent.keyDown(utils.getByTestId("3"), { key: "Backspace" })

  // verify that 2nd input is active and value was cleared
  await waitFor(() => expect(utils.getByTestId("2")).toHaveFocus())
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
  const utils = render(<Component />)

  // fill out the first two
  userEvent.type(utils.getByTestId("1"), "1")
  userEvent.type(utils.getByTestId("2"), "2")

  // click the clear button
  fireEvent.click(utils.getByRole("button"))

  // verify that input values are blank
  expect(utils.getByTestId("1")).toHaveValue("")
  expect(utils.getByTestId("2")).toHaveValue("")
})

test('otp flag enables "one-time-code" autocomplete on fields', () => {
  render(<Component otp />)

  expect(screen.getByTestId("1")).toHaveAttribute(
    "autocomplete",
    "one-time-code",
  )
  expect(screen.getByTestId("2")).toHaveAttribute(
    "autocomplete",
    "one-time-code",
  )
  expect(screen.getByTestId("3")).toHaveAttribute(
    "autocomplete",
    "one-time-code",
  )
})

test("Replacing last input calls onComplete correctly", () => {
  const onComplete = jest.fn()
  const { getByTestId } = render(<Component onComplete={onComplete} />)

  userEvent.type(getByTestId("1"), "1")
  userEvent.type(getByTestId("2"), "2")
  userEvent.type(getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
  onComplete.mockClear()

  userEvent.clear(getByTestId("3"))

  expect(onComplete).not.toHaveBeenCalledWith("123")

  userEvent.type(getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
})
