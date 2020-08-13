import * as React from "react"
import { render, userEvent, fireEvent, screen } from "@chakra-ui/test-utils"
import { chakra, forwardRef } from "@chakra-ui/system"
import { ClickableProps } from "../stories/use-clickable.stories"
import { useClickable } from "../src"

const Clickable: React.FC<ClickableProps> = forwardRef((props, ref) => {
  const clickable = useClickable({ ...props, ref })
  return <chakra.button display="inline-flex" {...clickable} />
})

describe("<Clickable />", () => {
  test("should render correctly", () => {
    render(<Clickable>clickable</Clickable>)

    expect(screen.getByText("clickable")).toMatchInlineSnapshot(`
    .emotion-0 {
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
    }

    <button
      class="emotion-0"
      type="button"
    >
      clickable
    </button>
  `)
  })

  test("should render when disabled and focusable", () => {
    render(
      <Clickable isDisabled isFocusable>
        clickable
      </Clickable>,
    )
    expect(screen.getByText("clickable")).toMatchInlineSnapshot(`
    .emotion-0 {
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
    }

    <button
      aria-disabled="true"
      class="emotion-0"
      type="button"
    >
      clickable
    </button>
  `)
  })

  test("should click correctly", () => {
    const fn = jest.fn()
    render(<Clickable onClick={fn}>clickable</Clickable>)
    const clickable = screen.getByText("clickable")

    expect(fn).toHaveBeenCalledTimes(0)
    userEvent.click(clickable)
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
    userEvent.click(clickable)
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
})
