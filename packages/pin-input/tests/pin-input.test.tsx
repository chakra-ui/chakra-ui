import * as React from "react"
import {
  fireEvent,
  render,
  renderInteractive,
  screen,
  waitFor,
} from "@chakra-ui/test-utils"
import {
  PinInputDescendantsProvider,
  PinInputProvider,
  usePinInput,
  usePinInputField,
  UsePinInputProps,
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
  render(<Component />)
  expect(screen.queryAllByLabelText("Please enter your pin code")).toHaveLength(
    3,
  )
})

test("can autofocus the first field", async () => {
  render(<Component autoFocus />)
  await waitFor(() => expect(screen.getByTestId("1")).toHaveFocus())
})

test("typing in an input automatically moves focus to the next item", async () => {
  const { user } = renderInteractive(<Component />)

  user.type(screen.getByTestId("1"), "1")
  await waitFor(() => expect(screen.getByTestId("2")).toHaveFocus())

  user.type(screen.getByTestId("2"), "2")
  await waitFor(() => expect(screen.getByTestId("3")).toHaveFocus())
})

test("pressing backspace moves to the previous input and clears", async () => {
  const { user } = renderInteractive(<Component />)

  // type in the first two inputs
  user.type(screen.getByTestId("1"), "1")
  user.type(screen.getByTestId("2"), "2")

  // verify that 3rd input is active
  await waitFor(() => expect(screen.getByTestId("3")).toHaveFocus())

  // send backspace to the 3rd input
  fireEvent.keyDown(screen.getByTestId("3"), { key: "Backspace" })

  // verify that 2nd input is active and value was cleared
  await waitFor(() => expect(screen.getByTestId("2")).toHaveFocus())
  expect(screen.getByTestId("2")).toHaveValue("")
})

test("filling out all inputs calls the complete callback", async () => {
  const onComplete = jest.fn()
  const { user } = renderInteractive(<Component onComplete={onComplete} />)

  await user.type(screen.getByTestId("1"), "1")
  await user.type(screen.getByTestId("2"), "2")
  await user.type(screen.getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
})

test("can clear all input", async () => {
  const { user } = renderInteractive(<Component />)

  // fill out the first two
  await user.type(screen.getByTestId("1"), "1")
  await user.type(screen.getByTestId("2"), "2")

  // click the clear button
  fireEvent.click(screen.getByRole("button"))

  // verify that input values are blank
  expect(screen.getByTestId("1")).toHaveValue("")
  expect(screen.getByTestId("2")).toHaveValue("")
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

test("Replacing last input calls onComplete correctly", async () => {
  const onComplete = jest.fn()
  const { user } = renderInteractive(<Component onComplete={onComplete} />)

  await user.type(screen.getByTestId("1"), "1")
  await user.type(screen.getByTestId("2"), "2")
  await user.type(screen.getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
  onComplete.mockClear()

  await user.clear(screen.getByTestId("3"))

  expect(onComplete).not.toHaveBeenCalledWith("123")

  await user.type(screen.getByTestId("3"), "3")

  expect(onComplete).toHaveBeenCalledWith("123")
})
