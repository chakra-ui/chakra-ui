import * as React from "react"
import { render, userEvent, fireEvent } from "@chakra-ui/test-utils"
import { chakra } from "@chakra-ui/system"
import { ClickableProps } from "../Clickable.stories"
import { useClickable } from "../Clickable"

const Clickable = (props: ClickableProps) => (
  <chakra.button display="inline-flex" {...useClickable(props)} />
)

test("should render correctly", () => {
  const tools = render(<Clickable>clickable</Clickable>)
  expect(tools.getByText("clickable")).toMatchInlineSnapshot(`
    <button
      class="css-vxcmzt"
      type="button"
    >
      clickable
    </button>
  `)
})

test("render disabled focusable", () => {
  const tools = render(
    <Clickable isDisabled isFocusable>
      clickable
    </Clickable>,
  )
  expect(tools.getByText("clickable")).toMatchInlineSnapshot(`
    <button
      aria-disabled="true"
      class="css-vxcmzt"
      type="button"
    >
      clickable
    </button>
  `)
})

test("click", () => {
  const fn = jest.fn()
  const tools = render(<Clickable onClick={fn}>clickable</Clickable>)
  const clickable = tools.getByText("clickable")

  expect(fn).toHaveBeenCalledTimes(0)
  userEvent.click(clickable)
  expect(fn).toHaveBeenCalledTimes(1)
})

test("click disabled", () => {
  const fn = jest.fn()

  const tools = render(
    <Clickable onClick={fn} isDisabled>
      clickable
    </Clickable>,
  )

  const clickable = tools.getByText("clickable")
  userEvent.click(clickable)
  expect(fn).toHaveBeenCalledTimes(0)
})

test("focus disabled", () => {
  const tools = render(<Clickable isDisabled>clickable</Clickable>)
  const clickable = tools.getByText("clickable")

  expect(clickable).not.toHaveFocus()
  fireEvent.focus(clickable)
  expect(clickable).not.toHaveFocus()
})

test("non-native button space/enter", () => {
  const fn = jest.fn()
  const tools = render(
    <Clickable as="div" onClick={fn}>
      clickable
    </Clickable>,
  )

  const clickable = tools.getByText("clickable")

  fireEvent.keyDown(clickable, { key: "Enter" })
  expect(fn).toHaveBeenCalledTimes(1)

  fireEvent.keyDown(clickable, { key: " " })
  fireEvent.keyUp(clickable, { key: " " })

  expect(fn).toHaveBeenCalledTimes(2)
})
