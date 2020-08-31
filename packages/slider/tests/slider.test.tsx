import { press, render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "../src"

test("matches snapshot", async () => {
  const { asFragment } = render(
    <Slider aria-label="slider-1" colorScheme="red">
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>,
  )

  expect(asFragment()).toMatchSnapshot()
})

test("passes a11y test", async () => {
  await testA11y(
    <Slider aria-label="slider-1" colorScheme="red">
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>,
  )
})

test("should move the thumb", () => {
  const defaultValue = 10
  const { getByRole } = render(
    <Slider aria-label="slider-2" colorScheme="red" defaultValue={defaultValue}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>,
  )

  const thumb = getByRole("slider")

  press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})
