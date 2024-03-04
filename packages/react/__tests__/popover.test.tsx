import { fireEvent, render, screen, waitFor } from "@chakra-ui/test-utils"
import * as React from "react"
import { UsePopoverProps, usePopover } from "../src/components/popover"

const PopoverDemo = (props: UsePopoverProps) => {
  const api = usePopover(props)

  return (
    <div>
      <button type="button" {...api.getTriggerProps()}>
        Open
      </button>
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps({
            children: <div>Popover content</div>,
          })}
        ></div>
      </div>
      <button type="button" onClick={api.onClose}>
        Close
      </button>
    </div>
  )
}

test("has proper aria attributes", async () => {
  const utils = render(<PopoverDemo />)
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
  const utils = render(<PopoverDemo />)

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  // close the popover (since we can click the button, we verify that it is
  // displayed)
  fireEvent.click(utils.getByText(/close/i))

  // verify that content isn't displayed after closing
  expect(utils.queryByText(/content/i)).not.toBeVisible()
})

test("can close the popover by pressing escape", async () => {
  const utils = render(<PopoverDemo />)

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  const dialog = await utils.findByRole("dialog")

  // close the popover with escape
  fireEvent.keyDown(dialog, { key: "Escape" })
})

type LazyPopoverContentProps = {
  mockFn: () => any | Promise<any>
}

const LazyPopoverDemo = (props: LazyPopoverContentProps) => {
  const { mockFn } = props

  React.useEffect(() => {
    mockFn()
  }, [mockFn])

  return <p data-testid="lazy-content">Lazy content</p>
}

const LazyPopover = (props: UsePopoverProps & LazyPopoverContentProps) => {
  const api = usePopover(props)

  return (
    <div>
      <button type="button" {...api.getTriggerProps()}>
        Open
      </button>
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps({
            children: (
              <div data-testid="content" tabIndex={0}>
                <LazyPopoverDemo mockFn={props.mockFn} />
              </div>
            ),
          })}
        ></div>
      </div>
      <button type="button" onClick={api.onClose}>
        Close
      </button>
    </div>
  )
}

test("loads content lazily and unmounts the component from the DOM", async () => {
  const mock = vi.fn()
  const utils = render(<LazyPopover isLazy mockFn={mock} />)

  // by default, content should not be visible
  let content = screen.queryByTestId("content")
  expect(content).not.toBeInTheDocument()
  expect(mock).toHaveBeenCalledTimes(0)

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  const dialog = await utils.findByRole("dialog")
  content = screen.queryByTestId("content")

  // content should now be in the DOM
  expect(content).toBeInTheDocument()
  expect(content).toBeVisible()
  expect(mock).toHaveBeenCalledTimes(1)

  // close the popover with escape
  fireEvent.keyDown(dialog, { key: "Escape" })
  expect(content).not.toBeInTheDocument()
  expect(content).not.toBeVisible()

  // ensure that when popover reopens, it also
  // gets remounted
  fireEvent.click(utils.getByText(/open/i))
  await utils.findByRole("dialog")

  content = screen.queryByTestId("content")
  expect(content).toBeInTheDocument()
  expect(content).toBeVisible()
  expect(mock).toHaveBeenCalledTimes(2)
})

test("loads content lazily and persists the component in the DOM", async () => {
  const mock = vi.fn()
  const utils = render(
    <LazyPopover isLazy lazyBehavior="keepMounted" mockFn={mock} />,
  )

  // by default, content should not be visible
  let content = screen.queryByTestId("content")
  expect(content).not.toBeInTheDocument()
  expect(mock).toHaveBeenCalledTimes(0)

  // open the popover
  fireEvent.click(utils.getByText(/open/i))

  const dialog = await utils.findByRole("dialog")
  content = screen.queryByTestId("content")

  // content should now be in the DOM
  expect(content).toBeInTheDocument()
  expect(mock).toHaveBeenCalledTimes(1)

  // close the popover with escape
  fireEvent.keyDown(dialog, { key: "Escape" })
  expect(content).toBeInTheDocument()
  expect(content).not.toBeVisible()

  // ensure that when popover reopens, it is
  // not remounting
  fireEvent.click(utils.getByText(/open/i))
  await utils.findByRole("dialog")

  content = screen.queryByTestId("content")
  expect(content).toBeInTheDocument()
  expect(mock).toHaveBeenCalledTimes(1)
})

// For testing focus interaction, use another component with a focusable element inside.
const FocusDemo = (props: UsePopoverProps) => {
  const api = usePopover(props)

  return (
    <div>
      <button type="button" {...api.getTriggerProps()}>
        Open
      </button>
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps({
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
      <button type="button" onClick={api.onClose}>
        Close
      </button>
    </div>
  )
}

test("when 'trigger'='hover', keep content visible while the tab focus is inside a popover", async () => {
  const { user } = render(<FocusDemo trigger="hover" />)

  const openButton = await screen.findByText(/open/i)
  const content = await screen.findByText(/content/i)
  const innerButton = await screen.findByText(/inner/i)
  const closeButton = await screen.findByText(/close/i)

  expect(document.body).toHaveFocus()

  await user.tab()

  expect(openButton).toHaveFocus()

  // open the popover, and it will have focus and be visible.
  await user.tab()
  expect(content).toHaveFocus()
  expect(content).toBeVisible()

  // move focus to next focusable element. Popover should be visible still.
  await user.tab()
  expect(innerButton).toHaveFocus()
  expect(innerButton).toBeVisible()

  // Close the popover. This should make Popover invisible.
  await user.tab()
  expect(closeButton).toHaveFocus()
  expect(content).not.toBeVisible()
})
