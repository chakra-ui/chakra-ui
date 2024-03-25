import { act, fireEvent, render, screen } from "@chakra-ui/test-utils"
import { useState } from "react"
import { Field, Switch } from "../src"

const DemoSwitch = (props: Switch.RootProps) => {
  return (
    <Switch.Root {...props}>
      <Switch.Track>
        <Switch.Thumb />
      </Switch.Track>
      {props.children && <Switch.Label>{props.children}</Switch.Label>}
    </Switch.Root>
  )
}

describe("Switch", () => {
  test("Uncontrolled - should check and uncheck", async () => {
    const { user } = render(<DemoSwitch />)
    const input = screen.getByRole("checkbox")

    await act(() => user.click(input))
    expect(input).toBeChecked()

    await act(() => user.click(input))
    expect(input).not.toBeChecked()
  })

  test("Uncontrolled - should not check if disabled", async () => {
    const { user } = render(<DemoSwitch disabled />)
    const input = screen.getByRole("checkbox")
    expect(input).toBeDisabled()

    await act(() => user.click(input))
    expect(input).not.toBeChecked()
  })

  test("Controlled - should check and uncheck", async () => {
    const onChange = vi.fn()

    const ControlledSwitch = () => {
      const [checked, setChecked] = useState(false)
      return (
        <DemoSwitch
          checked={checked}
          onChange={(e) => {
            onChange()
            setChecked(e.target.checked)
          }}
        />
      )
    }

    const { user } = render(<ControlledSwitch />)
    const input = screen.getByRole("checkbox")
    expect(input).not.toBeChecked()

    await act(() => user.click(input))

    expect(input).toBeChecked()
    expect(onChange).toHaveBeenCalled()

    await act(() => user.click(input))

    expect(input).not.toBeChecked()
    expect(onChange).toHaveBeenCalled()
  })

  test("Uncontrolled FormControl - should not check if form-control disabled", async () => {
    const { user } = render(
      <Field.Root disabled mt="4">
        <Field.Label>Disabled Opt-in Example</Field.Label>
        <DemoSwitch />
        <DemoSwitch disabled />
        <DemoSwitch disabled={false} />
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

  test("Uncontrolled FormControl - mark label as invalid", () => {
    render(
      <Field.Root invalid mt="4">
        <Field.Label>Invalid Opt-in Example</Field.Label>
        <DemoSwitch>Invalid Opt-in 1</DemoSwitch>
        <DemoSwitch invalid>Invalid Opt-in 2</DemoSwitch>
        <DemoSwitch invalid={false}>Invalid Opt-in 3</DemoSwitch>
      </Field.Root>,
    )

    const [inputA, inputB, inputC] = screen.getAllByRole("checkbox")

    expect(inputA).toHaveAttribute("aria-invalid", "true")
    expect(inputB).toHaveAttribute("aria-invalid", "true")
    expect(inputC).toHaveAttribute("aria-invalid", "false")
  })

  test("Uncontrolled FormControl - mark required", () => {
    render(
      <Field.Root required mt="4">
        <Field.Label>Required Opt-in Example</Field.Label>
        <DemoSwitch />
        <DemoSwitch required />
        <DemoSwitch required={false} />
      </Field.Root>,
    )

    const [inputA, inputB, inputC] = screen.getAllByRole("checkbox")

    expect(inputA).toBeRequired()
    expect(inputB).toBeRequired()
    expect(inputC).not.toBeRequired()
  })

  test("Uncontrolled FormControl - mark readonly", () => {
    render(
      <Field.Root readOnly mt="4">
        <Field.Label>ReadOnly Opt-in Example</Field.Label>
        <DemoSwitch />
      </Field.Root>,
    )

    const inputEl = screen.getByRole("checkbox")
    expect(inputEl).toHaveAttribute("readonly")
  })

  test("Uncontrolled FormControl - calls all onFocus EventHandler", async () => {
    const onFocus = vi.fn()
    const _onFocus = vi.fn()

    const { user } = render(
      <Field.Root mt="4" onFocus={onFocus}>
        <Field.Label>onFocus Example</Field.Label>
        <DemoSwitch onFocus={_onFocus} />
      </Field.Root>,
    )

    const inputEl = screen.getByRole("checkbox")
    await act(() => user.click(inputEl))

    expect(onFocus).toHaveBeenCalled()
    expect(_onFocus).toHaveBeenCalled()
  })

  test("Uncontrolled FormControl - calls all onBlur EventHandler", () => {
    const onBlur = vi.fn()
    const _onBlur = vi.fn()

    render(
      <Field.Root mt="4" onBlur={onBlur}>
        <Field.Label>onBlur Example</Field.Label>
        <DemoSwitch onBlur={_onBlur} />
      </Field.Root>,
    )

    const inputEl = screen.getByRole("checkbox")

    fireEvent.focus(inputEl)
    fireEvent.blur(inputEl)

    expect(onBlur).toHaveBeenCalled()
    expect(_onBlur).toHaveBeenCalled()
  })
})
