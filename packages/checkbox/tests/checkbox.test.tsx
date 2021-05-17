/* eslint-disable jsx-a11y/label-has-associated-control */
import Icon from "@chakra-ui/icon"
import {
  fireEvent,
  render,
  renderHook,
  screen,
  testA11y,
  userEvent,
} from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  useCheckbox,
  UseCheckboxProps,
} from "../src"

it("passes a11y test", async () => {
  await testA11y(<Checkbox>label</Checkbox>)
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
  render(<Component />)

  const input = screen.getByTestId("input")
  const checkbox = screen.getByTestId("checkbox")

  // click the first time, it is checked
  fireEvent.click(input)
  expect(input).toBeChecked()
  expect(checkbox).toHaveAttribute("data-checked")

  // click the second time, it is unchecked
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
  render(<Component />)

  const input = screen.getByTestId("input")
  const checkbox = screen.getByText("Checkbox")

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
  render(<Component />)

  const checkbox = screen.getByText("Checkbox")
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

  render(<Component onChange={onChange} />)

  const input = screen.getByTestId("input")
  const checkbox = screen.getByText("Checkbox")

  expect(checkbox).not.toHaveAttribute("data-checked")

  fireEvent.click(input)
  expect(checkbox).toHaveAttribute("data-checked")
  expect(onChange).toHaveBeenCalled()
})

test("CheckboxGroup Uncontrolled - default values should be check", () => {
  const Component = () => (
    <CheckboxGroup defaultValue={["one", "two"]}>
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two">Two</Checkbox>
      <Checkbox value="three">Three</Checkbox>
    </CheckboxGroup>
  )
  const { container } = render(<Component />)
  const checkboxOne = container.querySelectorAll("input")[0]
  const checkboxTwo = container.querySelectorAll("input")[1]
  const checkboxThree = container.querySelectorAll("input")[2]

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
  const onChange = jest.fn((value) => {
    checked = value
  })

  const Component = (props: CheckboxGroupProps) => (
    <CheckboxGroup {...props}>
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two">Two</Checkbox>
      <Checkbox value="three">Three</Checkbox>
    </CheckboxGroup>
  )
  const { container, rerender } = render(
    <Component value={checked} onChange={onChange} />,
  )
  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toBeChecked()
  expect(checkboxTwo).toBeChecked()
  expect(checkboxThree).not.toBeChecked()

  fireEvent.click(checkboxThree)

  // change props
  rerender(<Component value={checked} onChange={onChange} />)

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(checked).toEqual(["one", "two", "three"])
})

test("Uncontrolled CheckboxGroup - should not check if group disabled", () => {
  const Component = () => (
    <CheckboxGroup isDisabled>
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two" isDisabled>
        Two
      </Checkbox>
      <Checkbox value="three" isDisabled={false}>
        Three
      </Checkbox>
    </CheckboxGroup>
  )
  const { container } = render(<Component />)
  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toBeDisabled()
  expect(checkboxTwo).toBeDisabled()
  expect(checkboxThree).not.toBeDisabled()

  fireEvent.click(checkboxOne)
  fireEvent.click(checkboxTwo)
  fireEvent.click(checkboxThree)

  expect(checkboxOne).not.toBeChecked()
  expect(checkboxTwo).not.toBeChecked()
  expect(checkboxThree).toBeChecked()
})

test("uncontrolled CheckboxGroup handles change", () => {
  const onChange = jest.fn()
  render(
    <CheckboxGroup defaultValue={["A", "C"]} onChange={onChange}>
      <Checkbox value="A">A</Checkbox>
      <Checkbox value="B">B</Checkbox>
      <Checkbox value="C">C</Checkbox>
    </CheckboxGroup>,
  )

  userEvent.click(screen.getByLabelText("B"))

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(["A", "C", "B"])
})

test("accepts custom icon", () => {
  const CustomIcon = (props: any) => {
    const { isIndeterminate, isChecked, ...rest } = props

    const d = isIndeterminate
      ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
      : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"

    return (
      <Icon viewBox="0 0 24 24" {...rest}>
        <path fill="currentColor" d={d} />
      </Icon>
    )
  }

  render(
    <Checkbox defaultIsChecked icon={<CustomIcon data-testid="custom-icon" />}>
      hello world
    </Checkbox>,
  )

  expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
})
