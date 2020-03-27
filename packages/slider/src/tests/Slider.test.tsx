import React from "react"
import { render, axe, fireEvent } from "@chakra-ui/test-utils"
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from ".."

describe("rendering", () => {
  test("should render correctly", () => {
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
})

describe("accessibility", () => {
  test("should not have basic a11y issues", async () => {
    const { getByTestId } = render(
      <Slider aria-label="slider-1" data-testid="slider" colorScheme="red">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    )
    const results = await axe(getByTestId("slider"))
    expect(results).toHaveNoViolations()
  })
})

describe("user events", () => {
  test("should move the thumb", () => {
    const defaultValue = 10
    const { getByRole } = render(
      <Slider
        aria-label="slider-2"
        colorScheme="red"
        defaultValue={defaultValue}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    )

    const thumb = getByRole("slider")

    fireEvent.keyDown(thumb, { key: "ArrowRight" })
    expect(thumb).toHaveAttribute("aria-valuenow", "11")

    fireEvent.keyDown(thumb, { key: "ArrowRight" })
    expect(thumb).toHaveAttribute("aria-valuenow", "12")

    fireEvent.keyDown(thumb, { key: "Home" })
    expect(thumb).toHaveAttribute("aria-valuenow", "0")

    fireEvent.keyDown(thumb, { key: "End" })
    expect(thumb).toHaveAttribute("aria-valuenow", "100")
  })
})
