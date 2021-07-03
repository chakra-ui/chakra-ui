import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@chakra-ui/test-utils"
import { usePopover, UsePopoverProps } from "../src"

const Component = (props: UsePopoverProps) => {
  const {
    getTriggerProps,
    getPopoverProps,
    getPopoverPositionerProps,
    onClose,
  } = usePopover(props)

  return (
    <div>
      <button type="button" {...getTriggerProps()}>
        Open
      </button>
      <div {...getPopoverPositionerProps()}>
        <div
          {...getPopoverProps({
            children: <div data-testid="content">Popover content</div>,
          })}
        />
      </div>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  )
}

test("has proper aria attributes", async () => {
  const utils = render(<Component />)
  const trigger = utils.getByText(/open/i)

  expect(trigger).toHaveAttribute("aria-expanded", "false")

  // open the popover
  fireEvent.click(trigger)

  await waitFor(() =>
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog"),
  )
  expect(trigger).toHaveAttribute("aria-expanded", "true")
  expect(trigger).toHaveAttribute(
    "aria-controls",
    expect.stringContaining("popover-content"),
  )
  expect(utils.getByRole("dialog")).not.toHaveAttribute("aria-hidden")
})

test("can open and close the popover", async () => {
  const utils = render(<Component />)

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  // close the popover (since we can click the button, we verify that it is
  // displayed)
  fireEvent.click(utils.getByText(/close/i))

  // verify that content isn't displayed after closing
  expect(utils.queryByText(/content/i)).not.toBeVisible()
})

test("can close the popover by pressing escape", async () => {
  const utils = render(<Component />)

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  const dialog = await utils.findByRole("dialog")

  // close the popover with escape
  fireEvent.keyDown(dialog, { key: "Escape" })

  // verify popover is hidden
  // utils.getByRole("dialog", { hidden: true })
})

test("load content lazily", async () => {
  const utils = render(<Component isLazy lazyBehavior="keepMounted" />)

  // by default, content should not be visible
  let content = screen.queryByTestId("content")
  expect(content).not.toBeInTheDocument()

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  const dialog = await utils.findByRole("dialog")
  content = screen.queryByTestId("content")

  // content should now be visible
  expect(content).toBeInTheDocument()

  // close the popover with escape
  fireEvent.keyDown(dialog, { key: "Escape" })

  // content should still be visible
  expect(content).toBeInTheDocument()
})
