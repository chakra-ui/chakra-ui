/* eslint-disable jsx-a11y/aria-proptypes */
import * as React from "react"
import {
  press,
  render,
  screen,
  testA11y,
  userEvent,
  act,
} from "@chakra-ui/test-utils"
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "../src"

const HorizontalSlider = () => {
  return (
    <RangeSlider
      aria-label={["leftThumb", "rightThumb"]}
      min={1}
      max={100}
      defaultValue={[40, 80]}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}

const HorizontalSliderWithStackedThumbs = () => {
  return (
    <RangeSlider min={0} max={100} defaultValue={[0, 0, 100]}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
      <RangeSliderThumb index={2} />
    </RangeSlider>
  )
}

const getThumbs = () => screen.getAllByRole("slider")

test("passes a11y test", async () => {
  await testA11y(<HorizontalSlider />)
})

test("should move the left thumb with an arrow key", () => {
  render(<HorizontalSlider />)

  const [leftThumb] = getThumbs()

  press.ArrowRight(leftThumb)
  expect(leftThumb).toHaveAttribute("aria-valuenow", "41")
})

test("should move the right thumb with an arrow key", () => {
  render(<HorizontalSlider />)

  const [, rightThumb] = getThumbs()

  press.ArrowRight(rightThumb)
  expect(rightThumb).toHaveAttribute("aria-valuenow", "81")
})

test("should increment a thumb by 10 position pressing the page-up key", () => {
  render(<HorizontalSlider />)

  const [leftThumb] = getThumbs()

  press.PageUp(leftThumb)
  expect(leftThumb).toHaveAttribute("aria-valuenow", "50")
})

test("should decrement a thumb by 10 position pressing the page-down key", () => {
  render(<HorizontalSlider />)

  const [leftThumb] = getThumbs()

  press.PageDown(leftThumb)
  expect(leftThumb).toHaveAttribute("aria-valuenow", "30")
})

test("should set a thumb to its minimum value when pressing the home key", () => {
  render(<HorizontalSlider />)

  const [, rightThumb] = getThumbs()

  press.Home(rightThumb)
  // The minimum value for the right thumb is whatever value
  // the left thumb currently is
  expect(rightThumb).toHaveAttribute("aria-valuenow", "40")
})

test("should set a thumb to its maximum value when pressing the end key", () => {
  render(<HorizontalSlider />)

  const [, rightThumb] = getThumbs()

  press.End(rightThumb)
  expect(rightThumb).toHaveAttribute("aria-valuenow", "100")
})

test("should move the correct thumb when user clicks the track in case of stacked thumbs", async () => {
  render(<HorizontalSliderWithStackedThumbs />)

  const rangeSliderTrack = screen.getByTestId("chakra-range-slider-track")

  // getBoundingClientRect is not supported by JSDOM
  // its implementation needs to be mocked
  jest
    .spyOn(rangeSliderTrack, "getBoundingClientRect")
    .mockImplementation(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 20,
    }))

  const clickCoordinates = { clientX: 20, clientY: 10 }

  act(() => {
    userEvent.click(rangeSliderTrack, clickCoordinates)
  })

  const [firstThumb, secondThumb, thirdThumb] = getThumbs()

  expect(firstThumb).toHaveAttribute("aria-valuenow", "0")
  expect(secondThumb).toHaveAttribute("aria-valuenow", "20")
  expect(thirdThumb).toHaveAttribute("aria-valuenow", "100")
})
