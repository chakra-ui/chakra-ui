import { render, renderHook, fireEvent, testA11Y } from "@chakra-ui/test-utils"
import React from "react"
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  useCheckbox,
  UseCheckboxProps,
} from "../src"

describe("<Checkbox />", () => {
  test("renders correctly", () => {
    const tools = render(<Checkbox>This is custom checkbox</Checkbox>)
    expect(tools.asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11Y(<Checkbox>custom checkbox</Checkbox>)
  })

  test("useCheckbox should return object", () => {
    const { result } = renderHook(() => useCheckbox())
    expect(typeof result.current).toBe("object")
  })

  test("Uncontrolled - should check and uncheck", () => {
    const Component = () => {
      const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox()

      return (
        <label {...htmlProps}>
          <input data-testid="input" {...getInputProps()} />
          <div data-testid="checkbox" {...getCheckboxProps()}>
            Checkbox
          </div>
        </label>
      )
    }
    const tools = render(<Component />)

    const input = tools.getByTestId("input")
    const checkbox = tools.getByTestId("checkbox")

    // click the first time, it's checked
    fireEvent.click(input)
    expect(input).toBeChecked()
    expect(checkbox).toHaveAttribute("data-checked")

    // click the second time, it's unchecked
    fireEvent.click(input)
    expect(input).not.toBeChecked()
    expect(checkbox).not.toHaveAttribute("data-checked")
  })

  test("Uncontrolled - should not check if disabled", () => {
    const Component = () => {
      const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox({
        isDisabled: true,
      })

      return (
        <label {...htmlProps}>
          <input data-testid="input" {...getInputProps()} />
          <div {...getCheckboxProps()}>Checkbox</div>
        </label>
      )
    }
    const tools = render(<Component />)

    const input = tools.getByTestId("input")
    const checkbox = tools.getByText("Checkbox")

    expect(input).toBeDisabled()
    expect(checkbox).toHaveAttribute("data-disabled")

    fireEvent.click(checkbox)

    expect(input).not.toBeChecked()
    expect(checkbox).not.toHaveAttribute("data-checked")
  })

  test("indeterminate state", () => {
    const Component = () => {
      const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox({
        isIndeterminate: true,
      })

      return (
        <label {...htmlProps}>
          <input data-testid="input" {...getInputProps()} />
          <div {...getCheckboxProps()}>Checkbox</div>
        </label>
      )
    }
    const tools = render(<Component />)

    const checkbox = tools.getByText("Checkbox")
    expect(checkbox).toHaveAttribute("data-indeterminate")
  })

  test("Controlled - should check and uncheck", () => {
    const onChange = jest.fn()

    const Component = (props: UseCheckboxProps) => {
      const [isChecked, setIsChecked] = React.useState(false)
      const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox({
        isChecked,
        onChange: (event) => {
          setIsChecked(event.target.checked)
          props.onChange?.(event)
        },
      })

      return (
        <label {...htmlProps}>
          <input data-testid="input" {...getInputProps()} />
          <div {...getCheckboxProps()}>Checkbox</div>
        </label>
      )
    }

    const tools = render(<Component onChange={onChange} />)

    const input = tools.getByTestId("input")
    const checkbox = tools.getByText("Checkbox")

    expect(checkbox).not.toHaveAttribute("data-checked")

    fireEvent.click(input)
    expect(checkbox).toHaveAttribute("data-checked")
    expect(onChange).toHaveBeenCalled()
  })
})
