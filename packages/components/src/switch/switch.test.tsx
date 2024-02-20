import { fireEvent, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Switch } from "."
import { Form } from "../form-control"

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
    <Form.Control isDisabled mt={4}>
      <Form.Label>Disabled Opt-in Example</Form.Label>
      <DemoSwitch />
      <DemoSwitch isDisabled />
      <DemoSwitch isDisabled={false} />
    </Form.Control>,
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
    <Form.Control isInvalid mt={4}>
      <Form.Label>Invalid Opt-in Example</Form.Label>
      <DemoSwitch>Invalid Opt-in 1</DemoSwitch>
      <DemoSwitch isInvalid>Invalid Opt-in 2</DemoSwitch>
      <DemoSwitch isInvalid={false}>Invalid Opt-in 3</DemoSwitch>
    </Form.Control>,
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
    <Form.Control isRequired mt={4}>
      <Form.Label>Required Opt-in Example</Form.Label>
      <DemoSwitch />
      <DemoSwitch isRequired />
      <DemoSwitch isRequired={false} />
    </Form.Control>,
  )

  const [switchOne, switchTwo, switchThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(switchOne).toBeRequired()
  expect(switchTwo).toBeRequired()
  expect(switchThree).not.toBeRequired()
})

test("Uncontrolled FormControl - mark readonly", () => {
  const { container } = render(
    <Form.Control isReadOnly mt={4}>
      <Form.Label>ReadOnly Opt-in Example</Form.Label>
      <DemoSwitch />
      <DemoSwitch isReadOnly />
      <DemoSwitch isReadOnly={false} />
    </Form.Control>,
  )

  const [switchOne, switchTwo, switchThree] = Array.from(
    container.querySelectorAll("input"),
  )

  expect(switchOne).toHaveAttribute("readOnly")
  expect(switchTwo).toHaveAttribute("readOnly")
  expect(switchThree).not.toHaveAttribute("readOnly")

  const [controlOne, controlTwo, controlThree] = Array.from(
    container.querySelectorAll("span.chakra-switch__track"),
  )

  expect(controlOne).toHaveAttribute("data-readonly", "")
  expect(controlTwo).toHaveAttribute("data-readonly", "")
  expect(controlThree).not.toHaveAttribute("data-readonly")
})

test("Uncontrolled FormControl - calls all onFocus EventHandler", () => {
  const formControlOnFocusMock = vi.fn()
  const switchOnFocusMock = vi.fn()

  const { container } = render(
    <Form.Control mt={4} onFocus={formControlOnFocusMock}>
      <Form.Label>onFocus Example</Form.Label>
      <DemoSwitch onFocus={switchOnFocusMock} />
    </Form.Control>,
  )

  const [switchOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(switchOne)
  expect(formControlOnFocusMock).toHaveBeenCalled()
  expect(switchOnFocusMock).toHaveBeenCalled()
})

test("Uncontrolled FormControl - calls all onBlur EventHandler", () => {
  const formControlOnBlurMock = vi.fn()
  const switchOnBlurMock = vi.fn()

  const { container } = render(
    <Form.Control mt={4} onBlur={formControlOnBlurMock}>
      <Form.Label>onBlur Example</Form.Label>
      <DemoSwitch onBlur={switchOnBlurMock} />
    </Form.Control>,
  )

  const [switchOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(switchOne)
  fireEvent.blur(switchOne)
  expect(formControlOnBlurMock).toHaveBeenCalled()
  expect(switchOnBlurMock).toHaveBeenCalled()
})
