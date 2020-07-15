import { act, axe, press, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "../src"

function waitForNextFrame() {
  return act(() => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve())
    })
  })
}

afterEach(waitForNextFrame)

describe("rendering", () => {
  test("should render correctly", async () => {
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
    const { findByTestId } = render(
      <Slider aria-label="slider-1" data-testid="slider" colorScheme="red">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>,
    )

    const slider = await findByTestId("slider")

    // not sure why this is required here specifically
    await waitForNextFrame()

    const results = await axe(slider)
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

    press.ArrowRight(thumb)
    expect(thumb).toHaveAttribute("aria-valuenow", "11")

    press.ArrowRight(thumb)
    expect(thumb).toHaveAttribute("aria-valuenow", "12")

    press.Home(thumb)
    expect(thumb).toHaveAttribute("aria-valuenow", "0")

    press.End(thumb)
    expect(thumb).toHaveAttribute("aria-valuenow", "100")
  })
})
