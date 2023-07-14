import { fireEvent, render, screen } from "@chakra-ui/test-utils"
import { forwardRef } from "react"
import { useClickable } from "."

const Clickable = forwardRef<HTMLButtonElement, any>(function Clickable(
  props,
  ref,
) {
  const clickable = useClickable({ ...props, ref }) as any
  return <button style={{ display: "inline-flex" }} {...clickable} />
})

test("should render when disabled and focusable", () => {
  render(
    <Clickable isDisabled isFocusable>
      clickable
    </Clickable>,
  )
  expect(screen.getByText("clickable")).toHaveAttribute("aria-disabled", "true")
})

test("should click correctly", () => {
  const fn = jest.fn()
  render(<Clickable onClick={fn}>clickable</Clickable>)
  const clickable = screen.getByText("clickable")

  expect(fn).toHaveBeenCalledTimes(0)
  fireEvent.click(clickable)
  expect(fn).toHaveBeenCalledTimes(1)
})

test("should not click if disabled", () => {
  const fn = jest.fn()

  render(
    <Clickable onClick={fn} isDisabled>
      clickable
    </Clickable>,
  )

  const clickable = screen.getByText("clickable")
  fireEvent.click(clickable)
  expect(fn).toHaveBeenCalledTimes(0)
})

test("should not focus if disabled", () => {
  render(<Clickable isDisabled>clickable</Clickable>)
  const clickable = screen.getByText("clickable")

  expect(clickable).not.toHaveFocus()
  fireEvent.focus(clickable)
  expect(clickable).not.toHaveFocus()
})

test("non-native: should click on press `space` or `enter`", () => {
  const fn = jest.fn()
  render(
    <Clickable as="div" onClick={fn}>
      clickable
    </Clickable>,
  )

  const clickable = screen.getByText("clickable")

  fireEvent.keyDown(clickable, { key: "Enter" })
  expect(fn).toHaveBeenCalledTimes(1)

  fireEvent.keyDown(clickable, { key: " " })
  fireEvent.keyUp(clickable, { key: " " })

  expect(fn).toHaveBeenCalledTimes(2)
})
