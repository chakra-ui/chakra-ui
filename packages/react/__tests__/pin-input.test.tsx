import { act, fireEvent, render, screen, waitFor } from "@chakra-ui/test-utils"
import { useState } from "react"
import { PinInput } from "../src"

const DemoPinInput = (props: PinInput.RootProps = {}) => {
  return (
    <PinInput.Root {...props}>
      <PinInput.Control>
        <PinInput.Field data-testid="1" index={0} />
        <PinInput.Field data-testid="2" index={1} />
        <PinInput.Field data-testid="3" index={2} />
      </PinInput.Control>
    </PinInput.Root>
  )
}

describe("Pin Input", () => {
  test("can autofocus the first field", async () => {
    render(<DemoPinInput autoFocus />)
    const [first] = screen.getAllByRole("textbox")
    await waitFor(() => expect(first).toHaveFocus())
  })

  test("typing in an input automatically moves focus to the next item", async () => {
    const { user } = render(<DemoPinInput />)
    const [first, second, third] = screen.getAllByRole("textbox")

    await act(() => user.type(first, "1"))
    await waitFor(() => expect(second).toHaveFocus())

    await act(() => user.type(second, "2"))
    await waitFor(() => expect(third).toHaveFocus())
  })

  test("pressing backspace moves to the previous input and clears", async () => {
    const { user } = render(<DemoPinInput />)
    const [first, second, third] = screen.getAllByRole("textbox")

    await act(() => user.type(first, "1"))
    await act(() => user.type(second, "2"))

    await waitFor(() => expect(third).toHaveFocus())

    await act(() => fireEvent.keyDown(third, { key: "Backspace" }))

    await waitFor(() => expect(second).toHaveFocus())
    await waitFor(() => expect(third).toHaveValue(""))
  })

  test("filling out all inputs calls the complete callback", async () => {
    const onComplete = vi.fn()
    const { user } = render(<DemoPinInput onComplete={onComplete} />)

    const [first, second, third] = screen.getAllByRole("textbox")

    await act(() => user.type(first, "1"))
    await act(() => user.type(second, "2"))
    await act(() => user.type(third, "3"))

    expect(onComplete).toHaveBeenCalledWith(["1", "2", "3"])
  })

  test("can clear all input", async () => {
    const Component = () => {
      const [value, setValue] = useState(["", "", ""])
      return (
        <>
          <DemoPinInput value={value} onChange={setValue} />
          <button onClick={() => setValue(["", "", ""])}>Clear</button>
        </>
      )
    }

    const { user } = render(<Component />)
    const [first, second] = screen.getAllByRole("textbox")

    await act(() => user.type(first, "1"))
    await act(() => user.type(second, "2"))

    // click the clear button
    fireEvent.click(screen.getByRole("button"))

    // verify that input values are blank
    expect(first).toHaveValue("")
    expect(second).toHaveValue("")
  })

  test('otp flag enables "one-time-code" autocomplete on fields', async () => {
    render(<DemoPinInput otp />)
    const [first] = screen.getAllByRole("textbox")
    expect(first).toHaveAttribute("autocomplete", "one-time-code")
  })

  test("Replacing last input calls onComplete correctly", async () => {
    const onComplete = vi.fn()
    const { user } = render(<DemoPinInput onComplete={onComplete} />)

    const [first, second, third] = screen.getAllByRole("textbox")

    await act(() => user.type(first, "1"))
    await act(() => user.type(second, "2"))
    await act(() => user.type(third, "3"))

    await waitFor(() =>
      expect(onComplete).toHaveBeenCalledWith(["1", "2", "3"]),
    )
  })
})
