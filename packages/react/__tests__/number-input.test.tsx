import { fireEvent, screen, waitFor } from "@testing-library/react"
import { Field, HelpText, Label, NumberInput } from "../src"
import { render, testA11y } from "./core"

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

    await user.click(upBtn())
    expect(input()).toHaveValue("1")

    await user.click(upBtn())
    expect(input()).toHaveValue("2")
  })

  test("should increase/decrease with keyboard", async () => {
    const { user } = renderComponent()

    fireEvent.focus(input())

    await user.type(input(), "{arrowup}")
    await user.type(input(), "{arrowup}")
    await user.type(input(), "{arrowup}")
    expect(input()).toHaveValue("3")

    await user.type(input(), "{arrowdown}")
    await user.type(input(), "{arrowdown}")
    await user.type(input(), "{arrowdown}")
    expect(input()).toHaveValue("0")

    await user.type(input(), "{arrowup}")
    expect(input()).toHaveValue("1")

    await user.type(input(), "{home}")
    expect(input()).toHaveValue("-9007199254740991")

    await user.type(input(), "{end}")
    expect(input()).toHaveValue("9007199254740991")
  })

  test("should increase/decrease by 10*step on shift+Arrow", async () => {
    const { user } = renderComponent({ defaultValue: 0 })

    fireEvent.focus(input())

    await user.type(input(), "{arrowup}")
    expect(input()).toHaveValue("1")

    await user.type(input(), "{shift>}{ArrowUp}")
    expect(input()).toHaveValue("11")

    await user.type(input(), "{shift>}{ArrowDown}")
    expect(input()).toHaveValue("1")

    await user.type(input(), "{arrowdown}")
    expect(input()).toHaveValue("0")
  })

  test("should increase/decrease by 0.1*step on ctrl+Arrow", async () => {
    const { user } = renderComponent({
      defaultValue: 0,
      step: 0.1,
      precision: 2,
    })

    await user.type(input(), "[ArrowUp]")
    expect(input()).toHaveValue("0.10")

    await user.keyboard("[ControlLeft>][ArrowUp][/ControlLeft]")
    expect(input()).toHaveValue("0.11")

    await user.keyboard("[ControlLeft>][ArrowDown][/ControlLeft]")
    expect(input()).toHaveValue("0.10")

    await user.keyboard("[ArrowDown]")
    expect(input()).toHaveValue("0.00")
  })

  test("should behave properly with precision value", async () => {
    const { user } = renderComponent({
      defaultValue: 0,
      step: 0.65,
      precision: 2,
    })

    expect(input()).toHaveValue("0.00")
    await user.click(upBtn())

    expect(input()).toHaveValue("0.65")
    await user.click(upBtn())

    expect(input()).toHaveValue("1.30")
    await user.click(upBtn())

    expect(input()).toHaveValue("1.95")
    await user.click(downBtn())

    expect(input()).toHaveValue("1.30")
    await user.type(input(), "1234")

    await waitFor(() => expect(input()).toHaveValue("1.301234"))
    fireEvent.blur(input())

    expect(input()).toHaveValue("1.30")
  })

  test("should call onChange on value change", async () => {
    const onChange = vi.fn()

    const { user } = renderComponent({ onChange })
    await user.click(upBtn())

    expect(onChange).toBeCalled()
    expect(onChange).toBeCalledWith("1", 1)
  })

  test("should constrain value onBlur", async () => {
    const { user } = renderComponent({ max: 30, precision: 2 })

    await user.type(input(), "34.55")
    fireEvent.blur(input())

    expect(input()).toHaveValue("30.00")
  })

  test("should derive values from surrounding FormControl", () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()

    render(
      <Field
        id="input"
        required
        invalid
        disabled
        readOnly
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Label>Number</Label>
        <NumberInput.Root data-testid="root">
          <NumberInput.Field data-testid="input" />
          <NumberInput.Control data-testid="control">
            <NumberInput.IncrementTrigger children="+" data-testid="up-btn" />
            <NumberInput.DecrementTrigger children="-" data-testid="down-btn" />
          </NumberInput.Control>
        </NumberInput.Root>
        <HelpText>Select a number</HelpText>
      </Field>,
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
    await user.type(input(), "e")
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
    await user.click(upBtn())

    expect(input()).toHaveValue("0,65")
    await user.click(upBtn())

    expect(input()).toHaveValue("1,30")
    await user.click(upBtn())

    expect(input()).toHaveValue("1,95")
    await user.click(downBtn())

    expect(input()).toHaveValue("1,30")

    await user.type(input(), "1234")
    await waitFor(() => expect(input()).toHaveValue("1,301234"))

    fireEvent.blur(input())
    expect(input()).toHaveValue("1,30")
  })
})
