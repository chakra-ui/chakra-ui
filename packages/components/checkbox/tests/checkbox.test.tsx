import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Icon } from "@chakra-ui/icon"
import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
} from "../src"

it("passes a11y test", async () => {
  await testA11y(<Checkbox>label</Checkbox>)
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

  fireEvent.click(screen.getByLabelText("B"))

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
    <Checkbox defaultChecked icon={<CustomIcon data-testid="custom-icon" />}>
      hello world
    </Checkbox>,
  )

  expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
})

test("can pass tabIndex directly to input component", () => {
  const { container } = render(
    <>
      <Checkbox tabIndex={-1} isFocusable={false}>
        Not Focusable with provided tabIndex
      </Checkbox>
      <Checkbox isFocusable={false}>Not Focusable</Checkbox>
    </>,
  )
  const [checkboxOne, checkboxTwo] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toHaveAttribute("tabIndex", "-1")
  expect(checkboxTwo).not.toHaveAttribute("tabIndex")
})

test("useCheckboxGroup can handle both strings and numbers", () => {
  const Group = () => {
    const { value, getCheckboxProps } = useCheckboxGroup({
      defaultValue: [2, 3],
    })

    return (
      <div>
        <p id="value">{value.sort().join(", ")}</p>
        <Checkbox {...getCheckboxProps({ value: 1 })} />
        <Checkbox {...getCheckboxProps({ value: "2" })} />
        <Checkbox {...getCheckboxProps({ value: 3 })} />
      </div>
    )
  }

  const { container } = render(<Group />)

  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  const values = container.querySelector("p")

  expect(values?.innerHTML).toMatch("2, 3")
  expect(checkboxOne).not.toBeChecked()
  expect(checkboxTwo).toBeChecked()
  expect(checkboxThree).toBeChecked()

  fireEvent.click(checkboxOne)
  expect(values?.innerHTML).toMatch("1, 2, 3")
  expect(checkboxOne).toBeChecked()
  expect(checkboxTwo).toBeChecked()
  expect(checkboxThree).toBeChecked()

  fireEvent.click(checkboxTwo)
  fireEvent.click(checkboxThree)
  expect(values?.innerHTML).toMatch("1")
  expect(checkboxOne).toBeChecked()
  expect(checkboxTwo).not.toBeChecked()
  expect(checkboxThree).not.toBeChecked()

  fireEvent.click(checkboxOne)
  expect(values?.innerHTML).toMatch("")
  expect(checkboxOne).not.toBeChecked()
  expect(checkboxTwo).not.toBeChecked()
  expect(checkboxThree).not.toBeChecked()
})

test("Uncontrolled FormControl - should not check if form-control disabled", () => {
  const { container } = render(
    <FormControl isDisabled mt={4}>
      <FormLabel>Disabled Opt-in Example</FormLabel>
      <CheckboxGroup>
        <Checkbox value="1">Disabled Opt-in 1</Checkbox>
        <Checkbox value="2" isDisabled>
          Disabled Opt-in 2
        </Checkbox>
        <Checkbox value="3" isDisabled={false}>
          Disabled Opt-in 3
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup isDisabled={false}>
        <Checkbox value="1">Disabled Opt-in 1</Checkbox>
        <Checkbox value="2" isDisabled>
          Disabled Opt-in 2
        </Checkbox>
        <Checkbox value="3" isDisabled={false}>
          Disabled Opt-in 3
        </Checkbox>
      </CheckboxGroup>
    </FormControl>,
  )

  const [
    checkboxOne,
    checkboxTwo,
    checkboxThree,
    checkboxFour,
    checkboxFive,
    checkboxSix,
  ] = Array.from(container.querySelectorAll("input"))

  expect(checkboxOne).toBeDisabled()
  expect(checkboxTwo).toBeDisabled()
  expect(checkboxThree).not.toBeDisabled()

  expect(checkboxFour).not.toBeDisabled()
  expect(checkboxFive).toBeDisabled()
  expect(checkboxSix).not.toBeDisabled()

  fireEvent.click(checkboxOne)
  fireEvent.click(checkboxTwo)
  fireEvent.click(checkboxThree)

  fireEvent.click(checkboxFour)
  fireEvent.click(checkboxFive)
  fireEvent.click(checkboxSix)

  expect(checkboxOne).not.toBeChecked()
  expect(checkboxTwo).not.toBeChecked()
  expect(checkboxThree).toBeChecked()

  expect(checkboxFour).toBeChecked()
  expect(checkboxFive).not.toBeChecked()
  expect(checkboxSix).toBeChecked()
})

test("Uncontrolled FormControl - mark label as invalid", () => {
  const { container } = render(
    <FormControl isInvalid mt={4}>
      <FormLabel>Invalid Opt-in Example</FormLabel>
      <CheckboxGroup>
        <Checkbox value="1">Invalid Opt-in 1</Checkbox>
        <Checkbox value="2" isInvalid>
          Invalid Opt-in 2
        </Checkbox>
        <Checkbox value="3" isInvalid={false}>
          Invalid Opt-in 3
        </Checkbox>
      </CheckboxGroup>
    </FormControl>,
  )

  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toHaveAttribute("aria-invalid", "true")
  expect(checkboxTwo).toHaveAttribute("aria-invalid", "true")
  expect(checkboxThree).toHaveAttribute("aria-invalid", "false")

  const [labelOne, labelTwo, labelThree] = Array.from(
    container.querySelectorAll("span.chakra-checkbox__label"),
  )

  expect(labelOne).toHaveAttribute("data-invalid", "")
  expect(labelTwo).toHaveAttribute("data-invalid", "")
  expect(labelThree).not.toHaveAttribute("data-invalid")

  const [controlOne, controlTwo, controlThree] = Array.from(
    container.querySelectorAll("span.chakra-checkbox__control"),
  )

  expect(controlOne).toHaveAttribute("data-invalid", "")
  expect(controlTwo).toHaveAttribute("data-invalid", "")
  expect(controlThree).not.toHaveAttribute("data-invalid")
})

test("Uncontrolled FormControl - mark label required", () => {
  const { container } = render(
    <FormControl isRequired mt={4}>
      <FormLabel>Required Opt-in Example</FormLabel>
      <CheckboxGroup>
        <Checkbox value="1">Required Opt-in 1</Checkbox>
        <Checkbox value="2" isRequired>
          Required Opt-in 2
        </Checkbox>
        <Checkbox value="3" isRequired={false}>
          Required Opt-in 3
        </Checkbox>
      </CheckboxGroup>
    </FormControl>,
  )

  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toBeRequired()
  expect(checkboxTwo).toBeRequired()
  expect(checkboxThree).not.toBeRequired()
})

test("Uncontrolled FormControl - mark readonly", () => {
  const { container } = render(
    <FormControl isReadOnly mt={4}>
      <FormLabel>ReadOnly Opt-in Example</FormLabel>
      <CheckboxGroup>
        <Checkbox value="1">ReadOnly Opt-in 1</Checkbox>
        <Checkbox value="2" isReadOnly>
          ReadOnly Opt-in 2
        </Checkbox>
        <Checkbox value="3" isReadOnly={false}>
          ReadOnly Opt-in 3
        </Checkbox>
      </CheckboxGroup>
    </FormControl>,
  )

  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toHaveAttribute("readOnly")
  expect(checkboxTwo).toHaveAttribute("readOnly")
  expect(checkboxThree).not.toHaveAttribute("readOnly")

  const [controlOne, controlTwo, controlThree] = Array.from(
    container.querySelectorAll("span.chakra-checkbox__control"),
  )

  expect(controlOne).toHaveAttribute("data-readonly", "")
  expect(controlTwo).toHaveAttribute("data-readonly", "")
  expect(controlThree).not.toHaveAttribute("data-readonly")
})

test("Uncontrolled FormControl - calls all onFocus EventHandler", () => {
  const formControlOnFocusMock = jest.fn()
  const checkboxOnFocusMock = jest.fn()

  const { container } = render(
    <FormControl mt={4} onFocus={formControlOnFocusMock}>
      <FormLabel>onFocus example</FormLabel>
      <CheckboxGroup>
        <Checkbox value="1" onFocus={checkboxOnFocusMock}>
          onFocus Opt-in 1
        </Checkbox>
      </CheckboxGroup>
    </FormControl>,
  )

  const [checkboxOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(checkboxOne)
  expect(formControlOnFocusMock).toHaveBeenCalled()
  expect(checkboxOnFocusMock).toHaveBeenCalled()
})

test("Uncontrolled FormControl - calls all onBlur EventHandler", () => {
  const formControlOnBlurMock = jest.fn()
  const checkboxOnBlurMock = jest.fn()

  const { container } = render(
    <FormControl mt={4} onBlur={formControlOnBlurMock}>
      <FormLabel>onBlur Example</FormLabel>
      <CheckboxGroup>
        <Checkbox value="1" onBlur={checkboxOnBlurMock}>
          onBlur EOpt-in 1
        </Checkbox>
      </CheckboxGroup>
    </FormControl>,
  )

  const [checkboxOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(checkboxOne)
  fireEvent.blur(checkboxOne)
  expect(formControlOnBlurMock).toHaveBeenCalled()
  expect(checkboxOnBlurMock).toHaveBeenCalled()
})

test("On resetting form, checkbox should reset to its default state i.e., checked", () => {
  const { getByRole } = render(
    <form>
      <label htmlFor="myCheckbox">My Checkbox</label>
      <Checkbox id="myCheckbox" defaultChecked />
      <button type="reset">Reset</button>
    </form>,
  )
  const resetBtn = getByRole("button")
  const checkbox = getByRole("checkbox")
  fireEvent.click(checkbox)
  fireEvent.click(resetBtn)
  expect(checkbox).toBeChecked()
})

test("On resetting form, checkbox should reset to its default state i.e., unchecked", () => {
  const { getByRole } = render(
    <form>
      <label htmlFor="myCheckbox">My Checkbox</label>
      <Checkbox id="myCheckbox" />
      <button type="reset" name="resetBtn">
        Reset
      </button>
    </form>,
  )
  const resetBtn = getByRole("button")
  const checkbox = getByRole("checkbox")
  fireEvent.click(checkbox)
  fireEvent.click(resetBtn)
  expect(checkbox).not.toBeChecked()
})
