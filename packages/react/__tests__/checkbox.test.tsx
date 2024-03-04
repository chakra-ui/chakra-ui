import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Checkbox,
  UseCheckboxProps,
  useCheckbox,
  useCheckboxGroup,
} from "../src/components/checkbox"
import { Field } from "../src/components/field"
import { Icon } from "../src/components/icon"

const HookCheckbox = (
  props: UseCheckboxProps & { children?: React.ReactNode },
) => {
  const { children, ...restProps } = props
  const { getInputProps, getCheckboxProps } = useCheckbox(restProps)

  return (
    <label>
      <input data-testid="input" {...getInputProps()} />
      <div data-testid="checkbox" {...getCheckboxProps()}>
        {children}
      </div>
    </label>
  )
}

const DemoCheckbox = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Control />
      <Checkbox.Label>{props.children}</Checkbox.Label>
    </Checkbox.Root>
  )
}

test("passes a11y test", async () => {
  await testA11y(<DemoCheckbox>label</DemoCheckbox>)
})

test("Uncontrolled - should check and uncheck", () => {
  render(<HookCheckbox>Checkbox</HookCheckbox>)

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
  render(<HookCheckbox isDisabled>Checkbox</HookCheckbox>)

  const input = screen.getByTestId("input")
  const checkbox = screen.getByText("Checkbox")

  expect(input).toBeDisabled()
  expect(checkbox).toHaveAttribute("data-disabled")

  fireEvent.click(checkbox)

  expect(input).not.toBeChecked()
  expect(checkbox).not.toHaveAttribute("data-checked")
})

test("indeterminate state", () => {
  render(<HookCheckbox isIndeterminate>Checkbox</HookCheckbox>)

  const checkbox = screen.getByText("Checkbox")
  expect(checkbox).toHaveAttribute("data-indeterminate")
})

test("Controlled - should check and uncheck", async () => {
  const onChange = vi.fn()

  const Component = () => {
    const [isChecked, setIsChecked] = React.useState(false)
    return (
      <HookCheckbox
        isChecked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked)
          onChange(e)
        }}
      />
    )
  }

  const { user } = render(<Component />)

  const inputEl = screen.getByRole("checkbox")
  expect(inputEl).not.toBeChecked()

  await user.click(screen.getByRole("checkbox"))
  expect(inputEl).toBeChecked()
  expect(onChange).toHaveBeenCalled()
})

test("Checkbox.Group Uncontrolled - default values should be check", () => {
  const Component = () => (
    <Checkbox.Group defaultValue={["one", "two"]}>
      <DemoCheckbox value="one">One</DemoCheckbox>
      <DemoCheckbox value="two">Two</DemoCheckbox>
      <DemoCheckbox value="three">Three</DemoCheckbox>
    </Checkbox.Group>
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

test("Controlled Checkbox.Group", () => {
  let checked = ["one", "two"]
  const onChange = vi.fn((value) => {
    checked = value
  })

  const Component = (props: Checkbox.GroupProps) => (
    <Checkbox.Group {...props}>
      <DemoCheckbox value="one">One</DemoCheckbox>
      <DemoCheckbox value="two">Two</DemoCheckbox>
      <DemoCheckbox value="three">Three</DemoCheckbox>
    </Checkbox.Group>
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

test("Uncontrolled Checkbox.Group - should not check if group disabled", () => {
  const Component = () => (
    <Checkbox.Group isDisabled>
      <DemoCheckbox value="one">One</DemoCheckbox>
      <DemoCheckbox value="two" isDisabled>
        Two
      </DemoCheckbox>
      <DemoCheckbox value="three" isDisabled={false}>
        Three
      </DemoCheckbox>
    </Checkbox.Group>
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

test("uncontrolled Checkbox.Group handles change", () => {
  const onChange = vi.fn()
  render(
    <Checkbox.Group defaultValue={["A", "C"]} onChange={onChange}>
      <DemoCheckbox value="A">A</DemoCheckbox>
      <DemoCheckbox value="B">B</DemoCheckbox>
      <DemoCheckbox value="C">C</DemoCheckbox>
    </Checkbox.Group>,
  )

  fireEvent.click(screen.getByLabelText("B"))

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(["A", "C", "B"])
})

test("accepts custom icon", () => {
  const IconSvg = (props: any) => {
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
    <Checkbox.Root defaultChecked>
      <Checkbox.Control icon={<IconSvg data-testid="custom-icon" />} />
      <Checkbox.Label>hello world</Checkbox.Label>
    </Checkbox.Root>,
  )

  expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
})

test("can pass tabIndex directly to input component", () => {
  const { container } = render(
    <>
      <DemoCheckbox tabIndex={-1} isFocusable={false}>
        Not Focusable with provided tabIndex
      </DemoCheckbox>
      <DemoCheckbox isFocusable={false}>Not Focusable</DemoCheckbox>
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
        <DemoCheckbox {...getCheckboxProps({ value: 1 })} />
        <DemoCheckbox {...getCheckboxProps({ value: "2" })} />
        <DemoCheckbox {...getCheckboxProps({ value: 3 })} />
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

test("Uncontrolled Form.Control - should not check if form-control disabled", () => {
  const { container } = render(
    <Field.Root isDisabled mt={4}>
      <Field.Label>Disabled Opt-in Example</Field.Label>
      <Checkbox.Group>
        <DemoCheckbox value="1">Disabled Opt-in 1</DemoCheckbox>
        <DemoCheckbox value="2" isDisabled>
          Disabled Opt-in 2
        </DemoCheckbox>
        <DemoCheckbox value="3" isDisabled={false}>
          Disabled Opt-in 3
        </DemoCheckbox>
      </Checkbox.Group>
      <Checkbox.Group isDisabled={false}>
        <DemoCheckbox value="1">Disabled Opt-in 1</DemoCheckbox>
        <DemoCheckbox value="2" isDisabled>
          Disabled Opt-in 2
        </DemoCheckbox>
        <DemoCheckbox value="3" isDisabled={false}>
          Disabled Opt-in 3
        </DemoCheckbox>
      </Checkbox.Group>
    </Field.Root>,
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

test("Uncontrolled Form.Control - mark label as invalid", () => {
  const { container } = render(
    <Field.Root isInvalid mt={4}>
      <Field.Label>Invalid Opt-in Example</Field.Label>
      <Checkbox.Group>
        <DemoCheckbox value="1">Invalid Opt-in 1</DemoCheckbox>
        <DemoCheckbox value="2" isInvalid>
          Invalid Opt-in 2
        </DemoCheckbox>
        <DemoCheckbox value="3" isInvalid={false}>
          Invalid Opt-in 3
        </DemoCheckbox>
      </Checkbox.Group>
    </Field.Root>,
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

test("Uncontrolled Form.Control - mark label required", () => {
  const { container } = render(
    <Field.Root isRequired mt={4}>
      <Field.Label>Required Opt-in Example</Field.Label>
      <Checkbox.Group>
        <DemoCheckbox value="1">Required Opt-in 1</DemoCheckbox>
        <DemoCheckbox value="2" isRequired>
          Required Opt-in 2
        </DemoCheckbox>
        <DemoCheckbox value="3" isRequired={false}>
          Required Opt-in 3
        </DemoCheckbox>
      </Checkbox.Group>
    </Field.Root>,
  )

  const [checkboxOne, checkboxTwo, checkboxThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(checkboxOne).toBeRequired()
  expect(checkboxTwo).toBeRequired()
  expect(checkboxThree).not.toBeRequired()
})

test("Uncontrolled Form.Control - mark readonly", () => {
  const { container } = render(
    <Field.Root isReadOnly mt={4}>
      <Field.Label>ReadOnly Opt-in Example</Field.Label>
      <Checkbox.Group>
        <DemoCheckbox value="1">ReadOnly Opt-in 1</DemoCheckbox>
        <DemoCheckbox value="2" isReadOnly>
          ReadOnly Opt-in 2
        </DemoCheckbox>
        <DemoCheckbox value="3" isReadOnly={false}>
          ReadOnly Opt-in 3
        </DemoCheckbox>
      </Checkbox.Group>
    </Field.Root>,
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

test("Uncontrolled Form.Control - calls all onFocus EventHandler", () => {
  const formControlOnFocusMock = vi.fn()
  const checkboxOnFocusMock = vi.fn()

  const { container } = render(
    <Field.Root mt={4} onFocus={formControlOnFocusMock}>
      <Field.Label>onFocus example</Field.Label>
      <Checkbox.Group>
        <DemoCheckbox value="1" onFocus={checkboxOnFocusMock}>
          onFocus Opt-in 1
        </DemoCheckbox>
      </Checkbox.Group>
    </Field.Root>,
  )

  const [checkboxOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(checkboxOne)
  expect(formControlOnFocusMock).toHaveBeenCalled()
  expect(checkboxOnFocusMock).toHaveBeenCalled()
})

test("Uncontrolled Form.Control - calls all onBlur EventHandler", () => {
  const formControlOnBlurMock = vi.fn()
  const checkboxOnBlurMock = vi.fn()

  const { container } = render(
    <Field.Root mt={4} onBlur={formControlOnBlurMock}>
      <Field.Label>onBlur Example</Field.Label>
      <Checkbox.Group>
        <DemoCheckbox value="1" onBlur={checkboxOnBlurMock}>
          onBlur EOpt-in 1
        </DemoCheckbox>
      </Checkbox.Group>
    </Field.Root>,
  )

  const [checkboxOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(checkboxOne)
  fireEvent.blur(checkboxOne)
  expect(formControlOnBlurMock).toHaveBeenCalled()
  expect(checkboxOnBlurMock).toHaveBeenCalled()
})

test("On resetting form, all checkboxes in the form should reset to its default state i.e., checked/unchecked", () => {
  const { getByRole, getAllByRole } = render(
    <form>
      <label htmlFor="myCheckbox">My Checkbox</label>
      <DemoCheckbox id="myCheckbox" defaultChecked />
      <label htmlFor="myCheckbox2">My Checkbox2</label>
      <DemoCheckbox id="myCheckbox2" />
      <button type="reset">Reset</button>
    </form>,
  )

  const resetBtn = getByRole("button")
  const [checkbox1, checkbox2] = getAllByRole("checkbox")

  fireEvent.click(checkbox1)
  fireEvent.click(checkbox2)
  fireEvent.click(resetBtn)

  expect(checkbox1).toBeChecked()
  expect(checkbox2).not.toBeChecked()
})
