import { fireEvent, render, screen } from "@chakra-ui/test-utils"
import { Field } from "../src/components/field"
import {
  RadioGroup,
  UseRadioProps,
  useRadio,
} from "../src/components/radio-group"

test("has proper aria and data attributes", async () => {
  const Component = (props: UseRadioProps = {}) => {
    const { getRadioProps, getInputProps, getRootProps } = useRadio(props)

    return (
      <label data-testid="container" {...getRootProps()}>
        <input data-testid="input" {...getInputProps()} />
        <div data-testid="checkbox" {...getRadioProps()} />
      </label>
    )
  }
  const utils = render(<Component name="name" value="" id="id" />)

  let input = utils.getByTestId("input")
  let checkbox = utils.getByTestId("checkbox")
  let container = utils.getByTestId("container")

  expect(input).toHaveAttribute("name", "name")
  expect(input).toHaveAttribute("id", "id")
  expect(input).toHaveAttribute("value", "")
  expect(input).not.toBeDisabled()
  expect(input).not.toHaveAttribute("aria-required")
  expect(input).not.toHaveAttribute("required")
  expect(input).not.toHaveAttribute("aria-invalid")
  expect(input).not.toHaveAttribute("aria-disabled")
  expect(checkbox).toHaveAttribute("aria-hidden", "true")
  expect(checkbox).not.toHaveAttribute("data-active")
  expect(checkbox).not.toHaveAttribute("data-hover")
  expect(checkbox).not.toHaveAttribute("data-checked")
  expect(checkbox).not.toHaveAttribute("data-focus")
  expect(checkbox).not.toHaveAttribute("data-readonly")
  expect(container).not.toHaveAttribute("data-invalid")
  expect(container).not.toHaveAttribute("data-disabled")

  // render with various flags enabled
  utils.rerender(<Component isDisabled isInvalid isReadOnly isRequired />)

  input = utils.getByTestId("input")
  checkbox = utils.getByTestId("checkbox")
  container = utils.getByTestId("container")

  expect(input).toHaveAttribute("aria-required")
  expect(input).toHaveAttribute("required")
  expect(input).toHaveAttribute("aria-invalid")
  expect(input).toHaveAttribute("aria-disabled")
  expect(input).toBeDisabled()
  expect(checkbox).toHaveAttribute("data-readonly")
  expect(container).toHaveAttribute("data-invalid")
  expect(container).toHaveAttribute("data-disabled")

  // input is not truly disabled if focusable
  utils.rerender(<Component isDisabled isFocusable />)

  input = utils.getByTestId("input")

  expect(input).not.toBeDisabled()
})

test("handles events and callbacks correctly", () => {
  const hookProps = { onChange: vi.fn() }
  const checkboxProps = {
    onMouseDown: vi.fn(),
    onMouseUp: vi.fn(),
  }
  const inputProps = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    onFocus: vi.fn(),
    onKeyDown: vi.fn(),
    onKeyUp: vi.fn(),
  }
  const Component = () => {
    const { getRadioProps, getInputProps, getRootProps } = useRadio(hookProps)

    return (
      <label data-testid="container" {...getRootProps()}>
        <input data-testid="input" {...getInputProps(inputProps)} />
        <div data-testid="checkbox" {...getRadioProps(checkboxProps)} />
      </label>
    )
  }
  const utils = render(<Component />)
  const input = utils.getByTestId("input")
  const checkbox = utils.getByTestId("checkbox")
  const container = utils.getByTestId("container")
  expect(checkbox).not.toHaveAttribute("data-checked")
  expect(container).not.toHaveAttribute("data-checked")

  // mouse up and down
  fireEvent.mouseDown(checkbox)
  expect(checkbox).toHaveAttribute("data-active")
  expect(checkboxProps.onMouseDown).toHaveBeenCalled()

  fireEvent.mouseUp(checkbox)
  expect(checkbox).not.toHaveAttribute("data-active")
  expect(checkboxProps.onMouseUp).toHaveBeenCalled()

  // on change
  fireEvent.click(input)
  expect(input).toBeChecked()
  expect(checkbox).toHaveAttribute("data-checked")
  expect(container).toHaveAttribute("data-checked")
  expect(hookProps.onChange).toHaveBeenCalled()
  expect(inputProps.onChange).toHaveBeenCalled()

  // blur and focus
  fireEvent.focus(input)
  expect(checkbox).toHaveAttribute("data-focus")
  expect(inputProps.onFocus).toHaveBeenCalled()

  fireEvent.blur(input)
  expect(checkbox).not.toHaveAttribute("data-focus")
  expect(inputProps.onFocus).toHaveBeenCalled()

  // key down and key up
  fireEvent.keyDown(input, { key: " ", keyCode: 32 })
  expect(checkbox).toHaveAttribute("data-active")
  expect(inputProps.onKeyDown).toHaveBeenCalled()

  fireEvent.keyUp(input, { key: " ", keyCode: 32 })
  expect(checkbox).not.toHaveAttribute("data-active")
  expect(inputProps.onKeyUp).toHaveBeenCalled()
})

test("should derive values from surrounding FormControl", () => {
  const onFocus = vi.fn()
  const onBlur = vi.fn()

  render(
    <Field.Root
      id="radio"
      isRequired
      isInvalid
      isDisabled
      isReadOnly
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Field.Label>Radio</Field.Label>
      <RadioGroup.Item value="Chakra UI">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>Chakra UI</RadioGroup.ItemText>
      </RadioGroup.Item>
      <Field.HelpText>Select a value</Field.HelpText>
    </Field.Root>,
  )

  const radio = screen.getByRole("radio")

  expect(radio).toHaveAttribute("id", "radio")
  expect(radio).toHaveAttribute("aria-invalid", "true")
  expect(radio).toHaveAttribute("aria-required", "true")
  expect(radio).toHaveAttribute("data-readonly", "")
  expect(radio).toHaveAttribute("aria-invalid", "true")

  fireEvent.focus(radio)
  expect(onFocus).toHaveBeenCalled()

  fireEvent.blur(radio)
  expect(onBlur).toHaveBeenCalled()
})
