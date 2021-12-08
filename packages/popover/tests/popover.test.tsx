import * as React from "react"
import {
  fireEvent,
  render,
  screen,
  waitFor,
  userEvent,
} from "@chakra-ui/test-utils"
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

// For testing focus interaction, use another component with a focusable element inside.
const FocusTestComponent = (props: UsePopoverProps) => {
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
            children: (
              <div data-testid="content" tabIndex={0}>
                Popover content
                <button type="button" data-testid="InnerButton">
                  Inner Button
                </button>
              </div>
            ),
          })}
        />
      </div>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  )
}

test("when 'trigger'='hover', keep content visible while the tab focus is inside a popover", async () => {
  const utils = render(<FocusTestComponent trigger="hover" />)

  const openButton = utils.getByText(/open/i)
  const content = utils.queryByText(/content/i)
  const innerButton = utils.queryByText(/inner/i)
  const closeButton = utils.getByText(/close/i)

  expect(document.body).toHaveFocus()

  userEvent.tab()

  expect(openButton).toHaveFocus()

  // open the popover and it will have focus and be visible.
  userEvent.tab()
  expect(content).toHaveFocus()
  expect(content).toBeVisible()

  // move focus to next focusable element. Popover should be visible still.
  userEvent.tab()
  expect(innerButton).toHaveFocus()
  expect(innerButton).toBeVisible()

  // Close the popover. This should make Popover invisible.
  userEvent.tab()
  expect(closeButton).toHaveFocus()
  expect(content).not.toBeVisible()
})
