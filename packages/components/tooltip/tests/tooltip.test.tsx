import {
  act,
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { Tooltip, TooltipProps } from "../src"

const buttonLabel = "Hover me"
const tooltipLabel = "tooltip label"

const DummyComponent = (
  props: Omit<TooltipProps & { isButtonDisabled?: boolean }, "children">,
) => {
  const { isButtonDisabled, ...tooltipProps } = props
  return (
    <Tooltip label={tooltipLabel} {...tooltipProps}>
      <button disabled={isButtonDisabled || false}>{buttonLabel}</button>
    </Tooltip>
  )
}

test("passes a11y test when hovered", async () => {
  render(<DummyComponent />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  const tooltip = await screen.findByRole("tooltip")

  await testA11y(tooltip)
})

test("shows on mouseover and closes on mouseleave", async () => {
  render(<DummyComponent />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  fireEvent.mouseLeave(screen.getByText(buttonLabel))

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("should not show on mouseover if isDisabled is true", async () => {
  jest.useFakeTimers()

  render(<DummyComponent isDisabled />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  act(() => {
    jest.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  jest.useRealTimers()
})

test("should close on mouseleave if openDelay is set", async () => {
  jest.useFakeTimers()

  render(<DummyComponent openDelay={500} />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  act(() => {
    jest.advanceTimersByTime(200)
  })
  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  act(() => {
    jest.advanceTimersByTime(500)
  })
  expect(screen.queryByText(tooltipLabel)).toBeInTheDocument()

  fireEvent.mouseLeave(screen.getByText(buttonLabel))

  act(() => {
    jest.advanceTimersByTime(200)
  })

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )

  jest.useRealTimers()
})

test("should show on mouseover if isDisabled has a falsy value", async () => {
  render(<DummyComponent isDisabled={false} />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})

test("should close on mouseleave if shouldWrapChildren is true and child is a disabled element", async () => {
  render(<DummyComponent shouldWrapChildren isButtonDisabled />)

  fireEvent.mouseEnter(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  const wrapper = screen.getByText(buttonLabel).parentElement
  expect(wrapper).not.toBeNull()

  fireEvent.mouseLeave(wrapper!)

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("shows on mouseover and closes on pressing 'esc'", async () => {
  const { user } = render(<DummyComponent />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  await user.keyboard("[Escape]")

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("shows on mouseover and stays on pressing 'esc' if 'closeOnEsc' is false", async () => {
  const { user } = render(<DummyComponent closeOnEsc={false} />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  await user.keyboard("[Escape]")

  expect(screen.getByRole("tooltip")).toBeInTheDocument()
})
