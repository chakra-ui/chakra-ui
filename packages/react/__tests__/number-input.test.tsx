import {
  act,
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import { Field, NumberInput } from "../src"

function renderComponent(props: NumberInput.RootProps = {}) {
  return render(
    <>
      <label htmlFor="input">Select number:</label>
      <NumberInput.Root id="input" data-testid="root" {...props}>
        <NumberInput.Field data-testid="input" />
        <NumberInput.Control data-testid="control">
          <NumberInput.IncrementTrigger children="+" data-testid="up-btn" />
          <NumberInput.DecrementTrigger children="-" data-testid="down-btn" />
        </NumberInput.Control>
      </NumberInput.Root>
    </>,
  )
}

const input = () => screen.getByTestId("input")
const upBtn = () => screen.getByTestId("up-btn")
const downBtn = () => screen.getByTestId("down-btn")

describe("NumberInput", () => {
  test("passes a11y test", async () => {
    const { container } = renderComponent()
    await testA11y(container)
  })

  test("should increment on press increment button", async () => {
    const { user } = renderComponent()

    await act(() => user.click(upBtn()))
    expect(input()).toHaveValue("1")

    await act(() => user.click(upBtn()))
    expect(input()).toHaveValue("2")
  })

  test("should increase/decrease with keyboard", async () => {
    renderComponent()

    fireEvent.focus(input())

    await act(() => fireEvent.keyDown(input(), { key: "ArrowUp" }))
    await act(() => fireEvent.keyDown(input(), { key: "ArrowUp" }))
    await act(() => fireEvent.keyDown(input(), { key: "ArrowUp" }))
    expect(input()).toHaveValue("3")

    await act(() => fireEvent.keyDown(input(), { key: "ArrowDown" }))
    await act(() => fireEvent.keyDown(input(), { key: "ArrowDown" }))
    await act(() => fireEvent.keyDown(input(), { key: "ArrowDown" }))
    expect(input()).toHaveValue("0")

    await act(() => fireEvent.keyDown(input(), { key: "ArrowUp" }))
    expect(input()).toHaveValue("1")

    await act(() => fireEvent.keyDown(input(), { key: "Home" }))
    expect(input()).toHaveValue("-9007199254740991")

    await act(() => fireEvent.keyDown(input(), { key: "End" }))
    expect(input()).toHaveValue("9007199254740991")
  })

  test("should increase/decrease by 10*step on shift+Arrow", async () => {
    renderComponent({ defaultValue: 0 })

    fireEvent.focus(input())

    await act(() => fireEvent.keyDown(input(), { key: "ArrowUp" }))
    expect(input()).toHaveValue("1")

    await act(() =>
      fireEvent.keyDown(input(), { key: "ArrowUp", shiftKey: true }),
    )
    expect(input()).toHaveValue("11")

    await act(() =>
      fireEvent.keyDown(input(), { key: "ArrowDown", shiftKey: true }),
    )
    expect(input()).toHaveValue("1")

    await act(() => fireEvent.keyDown(input(), { key: "ArrowDown" }))
    expect(input()).toHaveValue("0")
  })

  test("should increase/decrease by 0.1*step on ctrl+Arrow", async () => {
    const { user } = renderComponent({
      defaultValue: 0,
      step: 0.1,
      precision: 2,
    })

    await act(() => user.type(input(), "[ArrowUp]"))
    expect(input()).toHaveValue("0.10")

    await act(() => user.keyboard("[ControlLeft>][ArrowUp][/ControlLeft]"))
    expect(input()).toHaveValue("0.11")

    await act(() => user.keyboard("[ControlLeft>][ArrowDown][/ControlLeft]"))
    expect(input()).toHaveValue("0.10")

    await act(() => user.keyboard("[ArrowDown]"))
    expect(input()).toHaveValue("0.00")
  })

  test("should behave properly with precision value", async () => {
    const { user } = renderComponent({
      defaultValue: 0,
      step: 0.65,
      precision: 2,
    })

    expect(input()).toHaveValue("0.00")
    await act(() => user.click(upBtn()))

    expect(input()).toHaveValue("0.65")
    await act(() => user.click(upBtn()))

    expect(input()).toHaveValue("1.30")
    await act(() => user.click(upBtn()))

    expect(input()).toHaveValue("1.95")
    await act(() => user.click(downBtn()))

    expect(input()).toHaveValue("1.30")
    await act(() => user.type(input(), "1234"))

    await waitFor(() => expect(input()).toHaveValue("1.301234"))
    fireEvent.blur(input())

    expect(input()).toHaveValue("1.30")
  })

  test("should call onChange on value change", async () => {
    const onChange = vi.fn()

    const { user } = renderComponent({ onChange })
    await act(() => user.click(upBtn()))

    expect(onChange).toBeCalled()
    expect(onChange).toBeCalledWith("1", 1)
  })

  test("should constrain value onBlur", async () => {
    const { user } = renderComponent({ max: 30, precision: 2 })

    await act(() => user.type(input(), "34.55"))
    fireEvent.blur(input())

    expect(input()).toHaveValue("30.00")
  })

  test("should derive values from surrounding FormControl", () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()

    render(
      <Field.Root
        id="input"
        required
        invalid
        disabled
        readOnly
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Field.Label>Number</Field.Label>
        <NumberInput.Root data-testid="root">
          <NumberInput.Field data-testid="input" />
          <NumberInput.Control data-testid="control">
            <NumberInput.IncrementTrigger children="+" data-testid="up-btn" />
            <NumberInput.DecrementTrigger children="-" data-testid="down-btn" />
          </NumberInput.Control>
        </NumberInput.Root>
        <Field.HelpText>Select a number</Field.HelpText>
      </Field.Root>,
    )

    expect(input()).toHaveAttribute("id", "input")
    expect(input()).toHaveAttribute("aria-invalid", "true")
    expect(input()).toHaveAttribute("aria-required", "true")
    expect(input()).toHaveAttribute("aria-readonly", "true")
    expect(input()).toHaveAttribute("aria-invalid", "true")
    expect(input()).toHaveAttribute("aria-describedby")

    fireEvent.focus(input())
    expect(onFocus).toHaveBeenCalled()

    fireEvent.blur(input())
    expect(onBlur).toHaveBeenCalled()
  })

  test("should reset value if `e` is typed", async () => {
    const { user } = renderComponent({ max: 30, min: 1 })
    await act(() => user.type(input(), "e"))
    fireEvent.blur(input())
    expect(input()).toHaveValue("")
  })

  test("custom format", async () => {
    const { user } = renderComponent({
      defaultValue: 0,
      step: 0.65,
      precision: 2,
      isValidCharacter: (v) => /^[Ee0-9+\-.,]$/.test(v),
      parse: (value) => value?.replace(",", "."),
      format: (value) => {
        if (!value) return value.toString()
        return value.toString().replace(".", ",")
      },
    })

    expect(input()).toHaveValue("0,00")
    await act(() => user.click(upBtn()))

    expect(input()).toHaveValue("0,65")
    await act(() => user.click(upBtn()))

    expect(input()).toHaveValue("1,30")
    await act(() => user.click(upBtn()))

    expect(input()).toHaveValue("1,95")
    await act(() => user.click(downBtn()))

    expect(input()).toHaveValue("1,30")

    await act(() => user.type(input(), "1234"))
    await waitFor(() => expect(input()).toHaveValue("1,301234"))

    fireEvent.blur(input())
    expect(input()).toHaveValue("1,30")
  })
})
