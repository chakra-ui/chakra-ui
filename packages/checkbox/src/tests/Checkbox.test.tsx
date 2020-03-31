import * as React from "react"
import { render, userEvent, renderHook, invoke } from "@chakra-ui/test-utils"
import { Checkbox, useCheckbox, CheckboxHookProps } from ".."
import { CheckboxGroup } from "../CheckboxGroup"

test("Checkbox renders correctly", () => {
  const utils = render(<Checkbox />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("useCheckbox should return object", () => {
  const { result } = renderHook(() => useCheckbox({}))
  expect(typeof result.current).toBe("object")
})

test("useCheckbox should return object with 4 keys", () => {
  const { result } = renderHook(() => useCheckbox({}))
  expect(Object.keys(result.current).length).toEqual(4)
})

test("Checkbox renders correctly", () => {
  const utils = render(<Checkbox>This is custom checkbox</Checkbox>)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("Uncontrolled - should check and uncheck", () => {
  const Component = () => {
    const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox()

    return (
      <label {...htmlProps}>
        <input data-testid="input" {...getInputProps()} />
        <div {...getCheckboxProps()}>Checkbox</div>
      </label>
    )
  }
  const utils = render(<Component />)

  const input = utils.getByTestId("input")
  const checkbox = utils.getByText("Checkbox")

  // click the first time, it's checked
  userEvent.click(checkbox)
  expect(input).toBeChecked()
  expect(checkbox).toHaveAttribute("data-checked")

  // click the second time, it's unchecked
  userEvent.click(checkbox)
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
  const utils = render(<Component />)

  const input = utils.getByTestId("input")
  const checkbox = utils.getByText("Checkbox")

  expect(input).toBeDisabled()
  expect(checkbox).toHaveAttribute("data-disabled")

  userEvent.click(checkbox)

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
  const utils = render(<Component />)

  const checkbox = utils.getByText("Checkbox")
  expect(checkbox).toHaveAttribute("data-mixed")
})

test("Controlled - should check and uncheck", () => {
  let checked = false
  const onChange = jest.fn(e => (checked = e.target.checked))

  const Component = (props: CheckboxHookProps) => {
    const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox(props)

    return (
      <label {...htmlProps}>
        <input data-testid="input" {...getInputProps()} />
        <div {...getCheckboxProps()}>Checkbox</div>
      </label>
    )
  }

  const utils = render(<Component isChecked={checked} onChange={onChange} />)

  const input = utils.getByTestId("input")
  const checkbox = utils.getByText("Checkbox")

  expect(input).not.toHaveAttribute("data-checked")

  userEvent.click(checkbox)
  expect(onChange).toHaveBeenCalled()

  utils.rerender(<Component isChecked={checked} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(checkbox).toHaveAttribute("data-checked")

  userEvent.click(checkbox)
  expect(onChange).toHaveBeenCalled()

  utils.rerender(<Component isChecked={checked} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(checkbox).not.toHaveAttribute("data-checked")
})
