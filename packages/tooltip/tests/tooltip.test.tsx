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

const DummyComponent = (props: Omit<TooltipProps, "children">) => (
  <Tooltip label={tooltipLabel} {...props}>
    <button>{buttonLabel}</button>
  </Tooltip>
)

test("matches snapshot", () => {
  const { asFragment } = render(<DummyComponent />)

  expect(asFragment()).toMatchSnapshot()
})

test("matches snapshot when hovererd", async () => {
  const { asFragment } = render(<DummyComponent />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(asFragment()).toMatchSnapshot()
})

test("passes a11y test when hovered", async () => {
  const { asFragment } = render(<DummyComponent />)

  fireEvent.mouseOver(screen.getByText(buttonLabel))

  const tooltip = await screen.findByRole("tooltip")

  await testA11y(tooltip)
})

test("shows on mouseover and closes on mouseout", async () => {
  const { asFragment } = render(<DummyComponent />)

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
  })

  await screen.findByRole("tooltip")

  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  act(() => {
    fireEvent.mouseOut(screen.getByText(buttonLabel))
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
  const { asFragment } = render(<DummyComponent isDisabled={false} />)

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
  })

  await screen.findByRole("tooltip")

  expect(asFragment()).toMatchSnapshot()
  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})
