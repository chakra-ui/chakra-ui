import { fireEvent, render, screen } from "@chakra-ui/test-utils"
import * as React from "react"
import { Field } from "../src/components/field"
import { Switch } from "../src/components/switch"

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

test("Uncontrolled - should check and uncheck", async () => {
  const { container, user } = render(<DemoSwitch />)
  const input = container.querySelector("input") as HTMLInputElement

  await user.click(input)
  expect(input).toBeChecked()

  await user.click(input)
  expect(input).not.toBeChecked()
})

test("Uncontrolled - should not check if disabled", async () => {
  const { container, user } = render(<DemoSwitch isDisabled />)
  const input = container.querySelector("input") as HTMLInputElement

  expect(input).toBeDisabled()

  await user.click(input)
  expect(input).not.toBeChecked()
})

test("Controlled - should check and uncheck", async () => {
  const ControlledSwitch = ({ onChange }: any) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <DemoSwitch
        isChecked={checked}
        onChange={(e) => {
          onChange?.()
          setChecked(e.target.checked)
        }}
      />
    )
  }

  const onChange = vi.fn()

  const { container, user } = render(<ControlledSwitch onChange={onChange} />)

  const input = container.querySelector("input") as HTMLInputElement

  expect(input).not.toBeChecked()

  await user.click(input)

  expect(input).toBeChecked()
  expect(onChange).toHaveBeenCalled()

  await user.click(input)

  expect(input).not.toBeChecked()
  expect(onChange).toHaveBeenCalled()
})

test("Uncontrolled FormControl - should not check if form-control disabled", async () => {
  const { container, user } = render(
    <Field.Root isDisabled mt={4}>
      <Field.Label>Disabled Opt-in Example</Field.Label>
      <DemoSwitch />
      <DemoSwitch isDisabled />
      <DemoSwitch isDisabled={false} />
    </Field.Root>,
  )

  const [switchOne, switchTwo, switchThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(switchOne).toBeDisabled()
  expect(switchTwo).toBeDisabled()
  expect(switchThree).not.toBeDisabled()

  await user.click(switchOne)
  await user.click(switchTwo)
  await user.click(switchThree)

  expect(switchOne).not.toBeChecked()
  expect(switchTwo).not.toBeChecked()
  expect(switchThree).toBeChecked()
})

test("Uncontrolled FormControl - mark label as invalid", () => {
  const { container } = render(
    <Field.Root isInvalid mt={4}>
      <Field.Label>Invalid Opt-in Example</Field.Label>
      <DemoSwitch>Invalid Opt-in 1</DemoSwitch>
      <DemoSwitch isInvalid>Invalid Opt-in 2</DemoSwitch>
      <DemoSwitch isInvalid={false}>Invalid Opt-in 3</DemoSwitch>
    </Field.Root>,
  )

  const [switchOne, switchTwo, switchThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(switchOne).toHaveAttribute("aria-invalid", "true")
  expect(switchTwo).toHaveAttribute("aria-invalid", "true")
  expect(switchThree).toHaveAttribute("aria-invalid", "false")

  const [labelOne, labelTwo, labelThree] = Array.from(
    container.querySelectorAll("span.chakra-switch__label"),
  )

  expect(labelOne).toHaveAttribute("data-invalid", "")
  expect(labelTwo).toHaveAttribute("data-invalid", "")
  expect(labelThree).not.toHaveAttribute("data-invalid")

  const [controlOne, controlTwo, controlThree] = Array.from(
    container.querySelectorAll("span.chakra-switch__track"),
  )

  expect(controlOne).toHaveAttribute("data-invalid", "")
  expect(controlTwo).toHaveAttribute("data-invalid", "")
  expect(controlThree).not.toHaveAttribute("data-invalid")
})

test("Uncontrolled FormControl - mark required", () => {
  const { container } = render(
    <Field.Root isRequired mt={4}>
      <Field.Label>Required Opt-in Example</Field.Label>
      <DemoSwitch />
      <DemoSwitch isRequired />
      <DemoSwitch isRequired={false} />
    </Field.Root>,
  )

  const [switchOne, switchTwo, switchThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(switchOne).toBeRequired()
  expect(switchTwo).toBeRequired()
  expect(switchThree).not.toBeRequired()
})

test("Uncontrolled FormControl - mark readonly", () => {
  render(
    <Field.Root isReadOnly mt={4}>
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
    <Field.Root mt={4} onFocus={onFocus}>
      <Field.Label>onFocus Example</Field.Label>
      <DemoSwitch onFocus={_onFocus} />
    </Field.Root>,
  )

  const inputEl = screen.getByRole("checkbox")
  await user.click(inputEl)

  expect(onFocus).toHaveBeenCalled()
  expect(_onFocus).toHaveBeenCalled()
})

test("Uncontrolled FormControl - calls all onBlur EventHandler", () => {
  const onBlur = vi.fn()
  const _onBlur = vi.fn()

  render(
    <Field.Root mt={4} onBlur={onBlur}>
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
