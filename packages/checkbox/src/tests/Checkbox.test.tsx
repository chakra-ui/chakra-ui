import { render, renderHook, fireEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  useCheckbox,
  UseCheckboxProps,
} from ".."

test("Checkbox renders correctly", () => {
  const tools = render(<Checkbox />)
  expect(tools.asFragment()).toMatchSnapshot()
})

test("useCheckbox should return object", () => {
  const { result } = renderHook(() => useCheckbox())
  expect(typeof result.current).toBe("object")
})

test("useCheckbox should return object with 4 keys", () => {
  const { result } = renderHook(() => useCheckbox())
  expect(Object.keys(result.current).length).toEqual(4)
})

test("Checkbox renders correctly", () => {
  const tools = render(<Checkbox>This is custom checkbox</Checkbox>)
  expect(tools.asFragment()).toMatchSnapshot()
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
  expect(checkbox).toHaveAttribute("data-mixed")
})

test("Controlled - should check and uncheck", () => {
  let checked = false
  const onChange = jest.fn(e => (checked = e.target.checked))

  const Component = (props: UseCheckboxProps) => {
    const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox(props)

    return (
      <label {...htmlProps}>
        <input data-testid="input" {...getInputProps()} />
        <div {...getCheckboxProps()}>Checkbox</div>
      </label>
    )
  }

  const tools = render(<Component isChecked={checked} onChange={onChange} />)

  const input = tools.getByTestId("input")
  const checkbox = tools.getByText("Checkbox")

  expect(input).not.toHaveAttribute("data-checked")

  fireEvent.click(checkbox)
  expect(onChange).toHaveBeenCalled()

  // change props
  tools.rerender(<Component isChecked={checked} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(checkbox).toHaveAttribute("data-checked")

  fireEvent.click(checkbox)
  expect(onChange).toHaveBeenCalled()

  tools.rerender(<Component isChecked={checked} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(checkbox).not.toHaveAttribute("data-checked")
})

test("CheckboxGroup Uncontrolled - default values should be check", () => {
  const Component = () => {
    return (
      <CheckboxGroup defaultValue={["one", "two"]}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </CheckboxGroup>
    )
  }
  const tools = render(<Component />)
  const checkboxOne = tools.container.querySelectorAll("input")[0]
  const checkboxTwo = tools.container.querySelectorAll("input")[1]
  const checkboxThree = tools.container.querySelectorAll("input")[2]

  expect(checkboxOne).toBeChecked()
  expect(checkboxTwo).toBeChecked()
  expect(checkboxThree).not.toBeChecked()

  fireEvent.click(checkboxThree)

  expect(checkboxOne).toBeChecked()
  expect(checkboxTwo).toBeChecked()
  expect(checkboxThree).toBeChecked()
})

test("Controlled CheckboxGroup", () => {
  let checked = ["one", "two"]
  const onChange = jest.fn(value => (checked = value))

  const Component = (props: CheckboxGroupProps) => {
    return (
      <CheckboxGroup {...props}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </CheckboxGroup>
    )
  }
  const tools = render(<Component value={checked} onChange={onChange} />)
  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    tools.container.querySelectorAll("input"),
  )

  expect(checkboxOne).toBeChecked()
  expect(checkboxTwo).toBeChecked()
  expect(checkboxThree).not.toBeChecked()

  fireEvent.click(checkboxThree)

  // change props
  tools.rerender(<Component value={checked} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(checked).toEqual(["one", "two", "three"])
})
