import {
  fireEvent,
  focus,
  hooks,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import { Field } from "../src/components/field"
import { NumberInput, useNumberInput } from "../src/components/number-input"

function renderComponent(props: NumberInput.RootProps = {}) {
  return render(
    <>
      <label htmlFor="input">Select number:</label>
      <NumberInput.Root id="input" data-testid="root" {...props}>
        <NumberInput.Field data-testid="input" />
        <NumberInput.Stepper data-testid="group">
          <NumberInput.IncrementStepper children="+" data-testid="up-btn" />
          <NumberInput.DecrementStepper children="-" data-testid="down-btn" />
        </NumberInput.Stepper>
      </NumberInput.Root>
    </>,
  )
}

test("passes a11y test", async () => {
  const { container } = renderComponent()
  await testA11y(container)
})

test("should start with empty string", () => {
  const { result } = hooks.render(() => useNumberInput())
  expect(result.current.value).toBe("")
})

test("should increment on press increment button", async () => {
  const { getByTestId, user } = renderComponent()

  const upBtn = getByTestId("up-btn")
  const input = getByTestId("input")

  await user.click(upBtn)
  // since the input's value is empty, this will set it to `step`
  // which is `1` by default
  expect(input).toHaveValue("1")

  await user.click(upBtn)
  expect(input).toHaveValue("2")
})

test("should increase/decrease with keyboard", async () => {
  const { getByTestId, user } = renderComponent()

  const input = getByTestId("input")

  focus(input)

  await user.keyboard("[ArrowUp>3/]")
  expect(input).toHaveValue("3")

  await user.keyboard("[ArrowDown>3/]")
  expect(input).toHaveValue("0")

  await user.keyboard("[ArrowUp]")
  expect(input).toHaveValue("1")

  await user.keyboard("[Home]")
  expect(input).toHaveValue("-9007199254740991")

  await user.keyboard("[End]")
  expect(input).toHaveValue("9007199254740991")
})

test("should increase/decrease by 10*step on shift+Arrow", async () => {
  const { getByTestId, user } = renderComponent({ defaultValue: 0 })

  const input = getByTestId("input")

  focus(input)

  await user.keyboard("[ArrowUp]")
  expect(input).toHaveValue("1")
  await user.keyboard("[ShiftLeft>][ArrowUp][/ShiftLeft]")
  expect(input).toHaveValue("11")

  await user.keyboard("[ShiftLeft>][ArrowDown][/ShiftLeft]")
  expect(input).toHaveValue("1")
  await user.keyboard("[ArrowDown]")
  expect(input).toHaveValue("0")
})

test("should increase/decrease by 0.1*step on ctrl+Arrow", async () => {
  const { getByTestId, user } = renderComponent({
    defaultValue: 0,
    step: 0.1,
    precision: 2,
  })

  const input = getByTestId("input")

  await user.type(input, "[ArrowUp]")
  expect(input).toHaveValue("0.10")
  await user.keyboard("[ControlLeft>][ArrowUp][/ControlLeft]")
  expect(input).toHaveValue("0.11")

  await user.keyboard("[ControlLeft>][ArrowDown][/ControlLeft]")
  expect(input).toHaveValue("0.10")
  await user.keyboard("[ArrowDown]")
  expect(input).toHaveValue("0.00")
})

test("should behave properly with precision value", async () => {
  const { getByTestId, user } = renderComponent({
    defaultValue: 0,
    step: 0.65,
    precision: 2,
  })

  const input = getByTestId("input")
  const incBtn = getByTestId("up-btn")
  const decBtn = getByTestId("down-btn")

  expect(input).toHaveValue("0.00")
  await user.click(incBtn)
  expect(input).toHaveValue("0.65")
  await user.click(incBtn)
  expect(input).toHaveValue("1.30")
  await user.click(incBtn)
  expect(input).toHaveValue("1.95")
  await user.click(decBtn)
  expect(input).toHaveValue("1.30")

  // on blur, value is clamped using precision
  await user.type(input, "1234")
  await waitFor(() => expect(input).toHaveValue("1.301234"))
  fireEvent.blur(input)
  expect(input).toHaveValue("1.30")
})

test("should call onChange on value change", async () => {
  const onChange = vi.fn()
  const { getByTestId, user } = renderComponent({ onChange })

  const upBtn = getByTestId("up-btn")

  await user.click(upBtn)

  expect(onChange).toBeCalled()
  expect(onChange).toBeCalledWith("1", 1)
})

test("should constrain value onBlur", async () => {
  const { getByTestId, user } = renderComponent({ max: 30, precision: 2 })

  const input = getByTestId("input")

  await user.type(input, "34.55")

  // value is beyond max, so it should reset to `max`
  fireEvent.blur(input)
  expect(input).toHaveValue("30.00")
})

test("should focus input on spin", async () => {
  const { getByTestId, user } = renderComponent()

  const input = getByTestId("input")
  const upBtn = getByTestId("up-btn")

  await user.click(upBtn)
  expect(input).toHaveValue("1")
})

test("should derive values from surrounding FormControl", () => {
  const onFocus = vi.fn()
  const onBlur = vi.fn()

  render(
    <Field.Root
      id="input"
      isRequired
      isInvalid
      isDisabled
      isReadOnly
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Field.Label>Number</Field.Label>
      <NumberInput.Root data-testid="root">
        <NumberInput.Field data-testid="input" />
        <NumberInput.Stepper data-testid="group">
          <NumberInput.IncrementStepper children="+" data-testid="up-btn" />
          <NumberInput.DecrementStepper children="-" data-testid="down-btn" />
        </NumberInput.Stepper>
      </NumberInput.Root>
      <Field.HelpText>Select a number</Field.HelpText>
    </Field.Root>,
  )

  const input = screen.getByTestId("input")

  expect(input).toHaveAttribute("id", "input")
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-required", "true")
  expect(input).toHaveAttribute("aria-readonly", "true")
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-describedby")

  fireEvent.focus(input)
  expect(onFocus).toHaveBeenCalled()

  fireEvent.blur(input)
  expect(onBlur).toHaveBeenCalled()
})

test("should reset value if `e` is typed", async () => {
  const { getByTestId, user } = renderComponent({ max: 30, min: 1 })

  const input = getByTestId("input")
  await user.type(input, "e")

  // value is beyond max, so it should reset to `max`
  fireEvent.blur(input)
  expect(input).toHaveValue("")
})
