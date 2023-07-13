import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { Progress, CircularProgress } from "../src"

test("Progress renders correctly", async () => {
  const { container } = render(
    <div>
      <Progress
        aria-label="Account Usage"
        colorScheme="green"
        size="sm"
        value={20}
      />
      <Progress
        aria-label="Account Usage"
        colorScheme="blue"
        size="md"
        hasStripe
        value={40}
      />
      <Progress
        aria-label="Account Usage"
        colorScheme="yellow"
        size="lg"
        hasStripe
        isAnimated
        value={80}
      />
      <Progress
        aria-label="Account Usage"
        aria-valuetext="Value text"
        colorScheme="green"
        size="sm"
        value={20}
      />
    </div>,
  )
  await testA11y(container)
})

test("CircularProgress renders correctly", async () => {
  const { container } = render(
    <div>
      <CircularProgress aria-label="Account Usage" size="60px" value={20} />
      <CircularProgress
        aria-label="Account Usage"
        size="120px"
        trackColor="transparent"
        thickness={10}
        value={60}
      />
    </div>,
  )
  await testA11y(container)
})

test("Progress: has the proper aria, data, and role attributes", () => {
  const { getByRole, rerender } = render(
    <Progress color="green" size="sm" aria-valuetext="text" value={20} />,
  )

  let progress = getByRole("progressbar")

  expect(progress).not.toHaveAttribute("data-indeterminate")
  expect(progress).toHaveAttribute("aria-valuemax", "100")
  expect(progress).toHaveAttribute("aria-valuemin", "0")
  expect(progress).toHaveAttribute("aria-valuenow", "20")
  expect(progress).toHaveAttribute("aria-valuetext", "text")

  // rerender as indeterminate
  rerender(<Progress color="green" size="sm" isIndeterminate />)

  progress = getByRole("progressbar")

  expect(progress).toHaveAttribute("data-indeterminate")
  expect(progress).not.toHaveAttribute("aria-valuenow")
})

test("CircularProgress: has the proper aria, data, and role attributes", () => {
  const props = {
    trackColor: "transparent",
    valueText: "value",
    thickness: 10,
    value: 20,
  }
  const utils = render(<CircularProgress {...props} />)

  let progress = utils.getByRole("progressbar")

  expect(progress).not.toHaveAttribute("data-indeterminate")
  expect(progress).toHaveAttribute("aria-valuemax", "100")
  expect(progress).toHaveAttribute("aria-valuemin", "0")
  expect(progress).toHaveAttribute("aria-valuenow", "20")
  expect(progress).toHaveAttribute("aria-valuetext", "value")

  // rerender as indeterminate
  utils.rerender(<CircularProgress {...props} isIndeterminate />)

  progress = utils.getByRole("progressbar")

  expect(progress).toHaveAttribute("data-indeterminate")
  expect(progress).not.toHaveAttribute("aria-valuenow")

  // rerender with getValueText function
  utils.rerender(
    <CircularProgress
      {...props}
      getValueText={(value, percent) => `${value} (${percent}%)`}
    />,
  )

  progress = utils.getByRole("progressbar")

  expect(progress).toHaveAttribute("aria-valuetext", "20 (20%)")
})

test("Progress as meter", async () => {
  const { getByRole, queryByRole, container } = render(
    <Progress
      color="green"
      size="sm"
      value={20}
      role="meter"
      aria-label="Usage"
    />,
  )

  expect(getByRole("meter")).toBeVisible()
  expect(queryByRole("progressbar")).toBeNull()

  await testA11y(container)
})
