import React from "react"
import { userEvent, render } from "@chakra-ui/test-utils"
import {
  SwitchRoot,
  SwitchInput,
  SwitchThumb,
  SwitchTrack,
} from "../Switch.base"
import Switch from "../Switch"

test("Switch renders correctly", () => {
  const utils = render(<Switch />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("Uncontrolled - should check and uncheck", () => {
  const { getByTestId } = render(
    <SwitchRoot data-testid="root">
      <SwitchInput data-testid="input" />
      <SwitchTrack data-testid="track">
        <SwitchThumb data-testid="thumb" />
      </SwitchTrack>
    </SwitchRoot>,
  )

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
  const { getByTestId } = render(
    <SwitchRoot isDisabled data-testid="root">
      <SwitchInput data-testid="input" />
      <SwitchTrack data-testid="track">
        <SwitchThumb data-testid="thumb" />
      </SwitchTrack>
    </SwitchRoot>,
  )

  const root = getByTestId("root")
  const input = getByTestId("input")
  const track = getByTestId("track")
  const thumb = getByTestId("thumb")

  expect(input).toBeDisabled()
  expect(track).toHaveAttribute("data-disabled")

  userEvent.click(root)

  expect(input).not.toBeChecked()
  expect(track).not.toHaveAttribute("data-checked")
})
