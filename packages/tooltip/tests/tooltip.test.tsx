import {
  act,
  testA11y,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { TooltipProps } from "../dist/types"
import { Tooltip } from "../src"

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

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
  })

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  act(() => {
    fireEvent.mouseLeave(screen.getByText(buttonLabel))
  })

  await waitForElementToBeRemoved(() => screen.getByText(tooltipLabel))
})

test("should not show on mouseover if isDisabled is true", async () => {
  jest.useFakeTimers()

  render(<DummyComponent isDisabled />)

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  jest.useRealTimers()
})

test("should show on mouseover if isDisabled has a falsy value", async () => {
  render(<DummyComponent isDisabled={false} />)

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
  })

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})

test("should close on mouseleave if shouldWrapChildren is true and child is a disabled element", async () => {
  render(<DummyComponent shouldWrapChildren isButtonDisabled={true} />)

  act(() => {
    fireEvent.mouseEnter(screen.getByText(buttonLabel))
  })

  await screen.findByRole("tooltip")

  const wrapper = screen.getByText(buttonLabel).parentElement
  expect(wrapper).not.toBeNull()

  act(() => {
    fireEvent.mouseLeave(wrapper!)
  })

  await waitForElementToBeRemoved(() => screen.getByText(tooltipLabel))
})
