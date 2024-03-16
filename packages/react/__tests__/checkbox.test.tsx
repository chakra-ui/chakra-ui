import { act, fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { useState } from "react"
import { Checkbox, Field, Icon } from "../src"

const DemoCheckbox = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Control data-testid="control" />
      <Checkbox.Label data-testid="label">{props.children}</Checkbox.Label>
    </Checkbox.Root>
  )
}

describe("Checkbox", () => {
  test("passes a11y test", async () => {
    await testA11y(<DemoCheckbox>label</DemoCheckbox>)
  })

  test("Uncontrolled - should check and uncheck", async () => {
    const { user } = render(<DemoCheckbox>Checkbox</DemoCheckbox>)

    // get underlying input checkbox
    const inputEl = screen.getByRole("checkbox")
    const controlEl = screen.getByTestId("control")

    // click the first time, it is checked
    await act(() => user.click(inputEl))
    expect(inputEl).toBeChecked()
    expect(controlEl).toHaveAttribute("data-checked")

    // click the second time, it is unchecked
    await act(() => user.click(inputEl))
    expect(inputEl).not.toBeChecked()
    expect(controlEl).not.toHaveAttribute("data-checked")
  })

  test("Uncontrolled - should not check if disabled", async () => {
    const { user } = render(<DemoCheckbox disabled>Checkbox</DemoCheckbox>)

    const inputEl = screen.getByRole("checkbox")
    const controlEl = screen.getByTestId("control")

    expect(inputEl).toBeDisabled()
    expect(controlEl).toHaveAttribute("data-disabled")

    await act(() => user.click(inputEl))
    expect(inputEl).not.toBeChecked()
    expect(controlEl).not.toHaveAttribute("data-checked")
  })

  test("indeterminate state", () => {
    render(<DemoCheckbox indeterminate>Checkbox</DemoCheckbox>)
    const controlEl = screen.getByTestId("control")
    expect(controlEl).toHaveAttribute("data-indeterminate")
  })

  test("Controlled - should check and uncheck", async () => {
    const onChange = vi.fn()

    const Component = () => {
      const [checked, setChecked] = useState(false)
      return (
        <DemoCheckbox
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked)
            onChange(e)
          }}
        />
      )
    }

    const { user } = render(<Component />)

    const controlEl = screen.getByTestId("control")
    expect(controlEl).not.toBeChecked()

    await act(() => user.click(controlEl))
    expect(controlEl).toHaveAttribute("data-checked")
    expect(onChange).toHaveBeenCalled()
  })

  test("Checkbox.Group Uncontrolled - default values should be check", async () => {
    const Component = () => (
      <Checkbox.Group defaultValue={["one", "two"]}>
        <DemoCheckbox value="one">One</DemoCheckbox>
        <DemoCheckbox value="two">Two</DemoCheckbox>
        <DemoCheckbox value="three">Three</DemoCheckbox>
      </Checkbox.Group>
    )

    const { user } = render(<Component />)

    const [inputA, inputB, inputC] = screen.getAllByRole("checkbox")

    expect(inputA).toBeChecked()
    expect(inputB).toBeChecked()
    expect(inputC).not.toBeChecked()

    await act(() => user.click(inputC))

    expect(inputA).toBeChecked()
    expect(inputB).toBeChecked()
    expect(inputC).toBeChecked()
  })

  test("Controlled Checkbox.Group", async () => {
    const onChange = vi.fn()

    const Component = () => {
      const [checked, setChecked] = useState<any[]>(["one", "two"])
      return (
        <Checkbox.Group
          value={checked}
          onChange={(v) => {
            setChecked(v)
            onChange(v)
          }}
        >
          <DemoCheckbox value="one">One</DemoCheckbox>
          <DemoCheckbox value="two">Two</DemoCheckbox>
          <DemoCheckbox value="three">Three</DemoCheckbox>
        </Checkbox.Group>
      )
    }
    const { user } = render(<Component />)

    const [inputA, inputB, inputC] = screen.getAllByRole("checkbox")

    expect(inputA).toBeChecked()
    expect(inputB).toBeChecked()
    expect(inputC).not.toBeChecked()

    await act(() => user.click(inputC))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test("Uncontrolled Checkbox.Group - should not check if group disabled", async () => {
    const Component = () => (
      <Checkbox.Group disabled>
        <DemoCheckbox value="one">One</DemoCheckbox>
        <DemoCheckbox value="two">Two</DemoCheckbox>
        <DemoCheckbox value="three" disabled={false}>
          Three
        </DemoCheckbox>
      </Checkbox.Group>
    )

    const { user } = render(<Component />)
    const [inputA, inputB, inputC] = screen.getAllByRole("checkbox")

    expect(inputA).toBeDisabled()
    expect(inputB).toBeDisabled()
    expect(inputC).not.toBeDisabled()

    await act(() => user.click(inputA))
    await act(() => user.click(inputB))
    await act(() => user.click(inputC))

    expect(inputA).not.toBeChecked()
    expect(inputB).not.toBeChecked()
    expect(inputC).toBeChecked()
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
      const { indeterminate, checked, ...rest } = props

      const d = indeterminate
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
        <Checkbox.Control>
          <IconSvg data-testid="custom-icon" />
        </Checkbox.Control>
        <Checkbox.Label>hello world</Checkbox.Label>
      </Checkbox.Root>,
    )

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
  })

  test("can pass tabIndex directly to input component", () => {
    const { container } = render(
      <>
        <DemoCheckbox tabIndex={-1} focusable={false}>
          Not Focusable with provided tabIndex
        </DemoCheckbox>
        <DemoCheckbox focusable={false}>Not Focusable</DemoCheckbox>
      </>,
    )
    const [inputA, inputB] = Array.from(container.querySelectorAll("input"))

    expect(inputA).toHaveAttribute("tabIndex", "-1")
    expect(inputB).not.toHaveAttribute("tabIndex")
  })

  test("Uncontrolled Form.Control - should not check if form-control disabled", async () => {
    const { user } = render(
      <Field.Root disabled mt={4}>
        <Field.Label>Disabled Opt-in Example</Field.Label>
        <Checkbox.Group>
          <DemoCheckbox value="1">Disabled Opt-in 1</DemoCheckbox>
          <DemoCheckbox value="2" disabled>
            Disabled Opt-in 2
          </DemoCheckbox>
          <DemoCheckbox value="3" disabled={false}>
            Disabled Opt-in 3
          </DemoCheckbox>
        </Checkbox.Group>
      </Field.Root>,
    )

    const [inputA, inputB, inputC] = screen.getAllByRole("checkbox")

    expect(inputA).toBeDisabled()
    expect(inputB).toBeDisabled()
    expect(inputC).not.toBeDisabled()

    await act(() => user.click(inputA))
    await act(() => user.click(inputB))
    await act(() => user.click(inputC))

    expect(inputA).not.toBeChecked()
    expect(inputB).not.toBeChecked()
    expect(inputC).toBeChecked()
  })

  test("Uncontrolled Form.Control - mark label as invalid", () => {
    const { container } = render(
      <Field.Root invalid mt={4}>
        <Field.Label>Invalid Opt-in Example</Field.Label>
        <Checkbox.Group>
          <DemoCheckbox value="1">Invalid Opt-in 1</DemoCheckbox>
          <DemoCheckbox value="2" invalid>
            Invalid Opt-in 2
          </DemoCheckbox>
          <DemoCheckbox value="3" invalid={false}>
            Invalid Opt-in 3
          </DemoCheckbox>
        </Checkbox.Group>
      </Field.Root>,
    )

    const [inputA, inputB, inputC] = Array.from(
      container.querySelectorAll("input"),
    )

    expect(inputA).toHaveAttribute("aria-invalid", "true")
    expect(inputB).toHaveAttribute("aria-invalid", "true")
    expect(inputC).toHaveAttribute("aria-invalid", "false")

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
      <Field.Root required mt={4}>
        <Field.Label>Required Opt-in Example</Field.Label>
        <Checkbox.Group>
          <DemoCheckbox value="1">Required Opt-in 1</DemoCheckbox>
          <DemoCheckbox value="2" required>
            Required Opt-in 2
          </DemoCheckbox>
          <DemoCheckbox value="3" required={false}>
            Required Opt-in 3
          </DemoCheckbox>
        </Checkbox.Group>
      </Field.Root>,
    )

    const [inputA, inputB, inputC] = Array.from(
      container.querySelectorAll("input"),
    )

    expect(inputA).toBeRequired()
    expect(inputB).toBeRequired()
    expect(inputC).not.toBeRequired()
  })

  test("Uncontrolled Form.Control - mark readonly", () => {
    const { container } = render(
      <Field.Root readOnly mt={4}>
        <Field.Label>ReadOnly Opt-in Example</Field.Label>
        <Checkbox.Group>
          <DemoCheckbox value="1">ReadOnly Opt-in 1</DemoCheckbox>
          <DemoCheckbox value="2" readOnly>
            ReadOnly Opt-in 2
          </DemoCheckbox>
          <DemoCheckbox value="3" readOnly={false}>
            ReadOnly Opt-in 3
          </DemoCheckbox>
        </Checkbox.Group>
      </Field.Root>,
    )

    const [inputA, inputB, inputC] = Array.from(
      container.querySelectorAll("input"),
    )

    expect(inputA).toHaveAttribute("readOnly")
    expect(inputB).toHaveAttribute("readOnly")
    expect(inputC).not.toHaveAttribute("readOnly")

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

    const [inputA] = Array.from(container.querySelectorAll("input"))
    fireEvent.focus(inputA)
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

    const [inputA] = Array.from(container.querySelectorAll("input"))
    fireEvent.focus(inputA)
    fireEvent.blur(inputA)
    expect(formControlOnBlurMock).toHaveBeenCalled()
    expect(checkboxOnBlurMock).toHaveBeenCalled()
  })

  test("On resetting form, all checkboxes in the form should reset to its default state i.e., checked/unchecked", async () => {
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
    const [inputA, inputB] = getAllByRole("checkbox")

    fireEvent.click(inputA)
    fireEvent.click(inputB)
    fireEvent.click(resetBtn)

    expect(inputA).toBeChecked()
    expect(inputB).not.toBeChecked()
  })
})
