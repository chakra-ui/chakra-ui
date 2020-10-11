import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Progress, CircularProgress } from "../src"

test("Progress renders correctly", () => {
  const { asFragment } = render(
    <div>
      <Progress color="green" size="sm" value={20} />
      <Progress color="blue" size="md" hasStripe value={40} />
      <Progress color="yellow" size="lg" hasStripe isAnimated value={80} />
    </div>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("CircularProgress renders correctly", () => {
  const { asFragment } = render(
    <div>
      <CircularProgress size="60px" value={20} />
      <CircularProgress
        size="120px"
        trackColor="transparent"
        thickness={10}
        value={60}
      />
    </div>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Progress: has the proper aria, data, and role attributes", () => {
  const utils = render(<Progress color="green" size="sm" value={20} />)

  let progress = utils.getByRole("progressbar")

  expect(progress).not.toHaveAttribute("data-indeterminate")
  expect(progress).toHaveAttribute("aria-valuemax", "100")
  expect(progress).toHaveAttribute("aria-valuemin", "0")
  expect(progress).toHaveAttribute("aria-valuenow", "20")
  expect(progress).not.toHaveAttribute("aria-valuetext")

  // rerender as indeterminate
  utils.rerender(<Progress color="green" size="sm" isIndeterminate />)

  progress = utils.getByRole("progressbar")

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
