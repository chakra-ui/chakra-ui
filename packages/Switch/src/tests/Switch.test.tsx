import React from "react"
import { userEvent, render, fireEvent } from "@chakra-ui/test-utils"
import {
  SwitchRoot,
  SwitchInput,
  SwitchThumb,
  SwitchTrack,
} from "../Switch.base"
import Switch from "../Switch"

const Component = (props: any) => {
  return (
    <SwitchRoot {...props} data-testid="root">
      <SwitchInput data-testid="input" />
      <SwitchTrack data-testid="track">
        <SwitchThumb data-testid="thumb" />
      </SwitchTrack>
    </SwitchRoot>
  )
}

test("Switch renders correctly", () => {
  const utils = render(<Switch />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("Uncontrolled - should check and uncheck", () => {
  const { getByTestId } = render(<Component />)

  const root = getByTestId("root")
  const input = getByTestId("input")
  const track = getByTestId("track")
  const thumb = getByTestId("thumb")

  userEvent.click(root)
  expect(input).toBeChecked()
  expect(thumb).toHaveAttribute("data-checked")
  expect(track).toHaveAttribute("data-checked")

  userEvent.click(root)
  expect(input).not.toBeChecked()
  expect(thumb).not.toHaveAttribute("data-checked")
  expect(track).not.toHaveAttribute("data-checked")
})

test("Uncontrolled - should not check if disabled", () => {
  const { getByTestId } = render(<Component isDisabled />)

  const root = getByTestId("root")
  const input = getByTestId("input")
  const track = getByTestId("track")

  expect(input).toBeDisabled()
  expect(track).toHaveAttribute("data-disabled")

  userEvent.click(root)

  expect(input).not.toBeChecked()
  expect(track).not.toHaveAttribute("data-checked")
})

test("indeterminate state", () => {
  const { getByTestId } = render(<Component isIndeterminate />)

  const track = getByTestId("track")

  expect(track).toHaveAttribute("data-mixed")
})

test("Controlled - should check and uncheck", () => {
  let value = false
  const onChange = jest.fn(e => (value = e.target.checked))

  const { getByTestId, rerender } = render(
    <Component isChecked={value} onChange={onChange} />,
  )

  const root = getByTestId("root")
  const thumb = getByTestId("thumb")

  expect(thumb).not.toHaveAttribute("data-checked")

  userEvent.click(root)
  expect(onChange).toHaveBeenCalled()

  rerender(<Component isChecked={value} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(thumb).toHaveAttribute("data-checked")

  userEvent.click(root)
  expect(onChange).toHaveBeenCalled()

  rerender(<Component isChecked={value} onChange={onChange} />)

  expect(onChange).toHaveBeenCalled()
  expect(thumb).not.toHaveAttribute("data-checked")
})
