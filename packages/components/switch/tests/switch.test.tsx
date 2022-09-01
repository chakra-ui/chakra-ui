import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { render, fireEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import { Switch } from "../src"

test("Uncontrolled - should check and uncheck", async () => {
  const { container, user } = render(<Switch />)
  const input = container.querySelector("input") as HTMLInputElement

  await user.click(input)
  expect(input).toBeChecked()

  await user.click(input)
  expect(input).not.toBeChecked()
})

test("Uncontrolled - should not check if disabled", async () => {
  const { container, user } = render(<Switch isDisabled />)
  const input = container.querySelector("input") as HTMLInputElement

  expect(input).toBeDisabled()

  await user.click(input)
  expect(input).not.toBeChecked()
})

test("Controlled - should check and uncheck", async () => {
  const ControlledSwitch = ({ onChange }: any) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Switch
        isChecked={checked}
        onChange={(e) => {
          onChange?.()
          setChecked(e.target.checked)
        }}
      />
    )
  }

  const onChange = jest.fn()

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
    <FormControl isDisabled mt={4}>
      <FormLabel>Disabled Opt-in Example</FormLabel>
      <Switch />
      <Switch isDisabled />
      <Switch isDisabled={false} />
    </FormControl>,
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
    <FormControl isInvalid mt={4}>
      <FormLabel>Invalid Opt-in Example</FormLabel>
      <Switch>Invalid Opt-in 1</Switch>
      <Switch isInvalid>Invalid Opt-in 2</Switch>
      <Switch isInvalid={false}>Invalid Opt-in 3</Switch>
    </FormControl>,
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
    <FormControl isRequired mt={4}>
      <FormLabel>Required Opt-in Example</FormLabel>
      <Switch />
      <Switch isRequired />
      <Switch isRequired={false} />
    </FormControl>,
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
    <FormControl isReadOnly mt={4}>
      <FormLabel>ReadOnly Opt-in Example</FormLabel>
      <Switch />
      <Switch isReadOnly />
      <Switch isReadOnly={false} />
    </FormControl>,
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
  const formControlOnFocusMock = jest.fn()
  const switchOnFocusMock = jest.fn()

  const { container } = render(
    <FormControl mt={4} onFocus={formControlOnFocusMock}>
      <FormLabel>onFocus Example</FormLabel>
      <Switch onFocus={switchOnFocusMock} />
    </FormControl>,
  )

  const [switchOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(switchOne)
  expect(formControlOnFocusMock).toHaveBeenCalled()
  expect(switchOnFocusMock).toHaveBeenCalled()
})

test("Uncontrolled FormControl - calls all onBlur EventHandler", () => {
  const formControlOnBlurMock = jest.fn()
  const switchOnBlurMock = jest.fn()

  const { container } = render(
    <FormControl mt={4} onBlur={formControlOnBlurMock}>
      <FormLabel>onBlur Example</FormLabel>
      <Switch onBlur={switchOnBlurMock} />
    </FormControl>,
  )

  const [switchOne] = Array.from(container.querySelectorAll("input"))
  fireEvent.focus(switchOne)
  fireEvent.blur(switchOne)
  expect(formControlOnBlurMock).toHaveBeenCalled()
  expect(switchOnBlurMock).toHaveBeenCalled()
})
