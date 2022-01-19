import * as React from "react"
import {
  act,
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

test("should delay opening content on hover", async () => {
  jest.useFakeTimers()
  const utils = render(
    <Component trigger="hover" openDelay={500} closeDelay={0} />,
  )

  // by default, content should not be visible
  expect(screen.queryByText("Popover content")).not.toBeVisible()

  // only pass 40% of the time
  act(() => {
    fireEvent.mouseOver(utils.getByText(/open/i))
    jest.advanceTimersByTime(200)
  })

  // content should still not appear since 500ms has not occurred
  expect(screen.queryByText("Popover content")).not.toBeVisible()

  // Pass 100% of the time
  act(() => {
    jest.advanceTimersByTime(300)
  })

  // content should be visible to user
  await waitFor(() => {
    expect(screen.getByText("Popover content")).toBeVisible()
  })

  jest.useRealTimers()
})

test("should not display popover content when leaving the trigger before the targeted delay time", () => {
  jest.useFakeTimers()
  render(<Component trigger="hover" openDelay={500} closeDelay={0} />)

  // by default, content should not be visible
  expect(screen.queryByText("Popover content")).not.toBeVisible()

  // simulate an entry that is less than the open delay and then leave
  act(() => {
    fireEvent.mouseOver(screen.getByRole("button", { name: "Open" }))
    jest.advanceTimersByTime(200)
    fireEvent.mouseLeave(screen.getByRole("button", { name: "Open" }))
    jest.advanceTimersByTime(300)
  })

  expect(screen.queryByText("Popover content")).not.toBeVisible()
  jest.useRealTimers()
})

test("should delay closing content on hover leave", async () => {
  jest.useFakeTimers()
  render(<Component trigger="hover" openDelay={0} closeDelay={500} />)

  // by default, content should not be visible
  expect(screen.queryByText("Popover content")).not.toBeVisible()

  // leave the hover to start the close delay
  act(() => {
    fireEvent.mouseOver(screen.getByRole("button", { name: "Open" }))
    jest.advanceTimersByTime(200)
    fireEvent.mouseLeave(screen.getByRole("button", { name: "Open" }))
  })

  // since only 40% of the time has passed, content should still appear
  await waitFor(() => {
    expect(screen.queryByText("Popover content")).toBeVisible()
  })

  // pass 100% of the time
  act(() => {
    jest.advanceTimersByTime(300)
  })

  // content should not be visible
  await waitFor(() => {
    expect(screen.queryByText("Popover content")).not.toBeVisible()
  })

  jest.useRealTimers()
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
  await waitFor(() => {
    expect(content).toBeVisible()
  })

  // move focus to next focusable element. Popover should be visible still.
  userEvent.tab()
  expect(innerButton).toHaveFocus()
  expect(innerButton).toBeVisible()

  // Close the popover. This should make Popover invisible.
  userEvent.tab()
  expect(closeButton).toHaveFocus()
  expect(content).not.toBeVisible()
})
