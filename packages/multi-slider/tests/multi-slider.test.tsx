import { press, render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  MultiSlider,
  MultiSliderFilledTrack,
  MultiSliderThumb,
  MultiSliderTrack,
} from "../src"

test("passes a11y test", async () => {
  await testA11y(
    <MultiSlider colorScheme="red">
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
      </MultiSliderTrack>
      <MultiSliderThumb thumbKey={0} aria-label="slider 0" />
      <MultiSliderThumb thumbKey={1} aria-label="slider 1" />
    </MultiSlider>,
  )
})

test("should move the thumb", () => {
  const { getByLabelText } = render(
    <MultiSlider colorScheme="red">
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
      </MultiSliderTrack>
      <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={10} />
      <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={15} />
    </MultiSlider>,
  )

  const thumb = getByLabelText("slider 0")

  press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "15")
})
