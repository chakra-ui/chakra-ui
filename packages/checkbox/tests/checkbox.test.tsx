/* eslint-disable jsx-a11y/label-has-associated-control */
import Icon from "@chakra-ui/icon"
import {
  fireEvent,
  render,
  renderHook,
  screen,
  testA11y,
} from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  useCheckbox,
  UseCheckboxProps,
} from "../src"

test("matches snapshot ", () => {
  const { asFragment } = render(<Checkbox />)
  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test", async () => {
  await testA11y(<Checkbox>label</Checkbox>)
})

test("useCheckbox should return object", () => {
  const { result } = renderHook(() => useCheckbox())
  expect(typeof result.current).toBe("object")
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
  const Component = () => {
    return (
      <CheckboxGroup defaultValue={["one", "two"]}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </CheckboxGroup>
    )
  }
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
  const onChange = jest.fn((value) => (checked = value))

  const Component = (props: CheckboxGroupProps) => {
    return (
      <CheckboxGroup {...props}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </CheckboxGroup>
    )
  }
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

  expect(onChange).toHaveBeenCalled()
  expect(checked).toEqual(["one", "two", "three"])
})

test("accepts custom icon", () => {
  const CustomIcon = (props: any) => {
    const { isIndeterminate, ...rest } = props

    const d = isIndeterminate
      ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
      : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"

    return (
      <Icon viewBox="0 0 24 24" {...rest}>
        <path fill="currentColor" d={d} />
      </Icon>
    )
  }

  const { asFragment } = render(
    <Checkbox defaultIsChecked icon={<CustomIcon data-testid="custom-icon" />}>
      hello world
    </Checkbox>,
  )

  expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})
