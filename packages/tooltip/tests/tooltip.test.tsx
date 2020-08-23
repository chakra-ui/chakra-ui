import { act, testA11y, fireEvent, render, screen } from "@chakra-ui/test-utils"
import * as React from "react"
import { Tooltip } from "../src"

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

test("should render without errors", () => {
  const { asFragment } = render(
    <Tooltip label="tooltip label">
      <button>Hover me</button>
    </Tooltip>,
  )

  expect(asFragment()).toMatchSnapshot()
})

test("should have no violations", async () => {
  const buttonLabel = "Hover me"

  render(
    <Tooltip label="tooltip label">
      <button>Hover me</button>
    </Tooltip>,
  )

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  const tooltip = screen.queryByRole("tooltip") as HTMLElement

  await testA11y(tooltip)
})

test("shows on mouseover and closes on mouseout", async () => {
  const buttonLabel = "Hover me"
  const tooltipLabel = "tooltip label"

  const tools = render(
    <Tooltip label="tooltip label">
      <button>Hover me</button>
    </Tooltip>,
  )

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  expect(tools.asFragment()).toMatchSnapshot()
  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  act(() => {
    fireEvent.mouseOut(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).toBeNull()
})

test("should not show on mouseover if isDisabled is true", async () => {
  const buttonLabel = "Hover me"
  const tooltipLabel = "tooltip label"

  render(
    <Tooltip label="tooltip label" isDisabled={true}>
      <button>Hover me</button>
    </Tooltip>,
  )

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).toBeNull()
})

test("should show on mouseover if isDisabled has a falsy value", async () => {
  const buttonLabel = "Hover me"

  const disabledState = false
  const tools = render(
    <Tooltip label="tooltip label" isDisabled={disabledState}>
      <button>Hover me</button>
    </Tooltip>,
  )

  act(() => {
    fireEvent.mouseOver(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  expect(tools.asFragment()).toMatchSnapshot()
  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()
})
