import React from "react"
import { Tooltip } from ".."
import {
  render,
  act,
  fireEvent,
  screen,
  waitForDomChange,
  axe,
} from "@chakra-ui/test-utils"

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

  await waitForDomChange()

  axe(screen.queryByRole("tooltip") as any).then(res => {
    expect(res).toHaveNoViolations()
  })
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

  await waitForDomChange()

  expect(tools.asFragment()).toMatchSnapshot()
  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  act(() => {
    fireEvent.mouseOut(screen.getByText(buttonLabel))
    jest.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).toBeNull()
})
