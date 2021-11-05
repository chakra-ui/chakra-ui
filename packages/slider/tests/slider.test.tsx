import { extendTheme, ThemeProvider } from "@chakra-ui/react"
import { press, render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  UseSliderProps,
} from "../src"

const defaultValue = 10

const SimpleSlider = (props: {
  defaultValue?: number
  isReversed?: boolean
  orientation?: UseSliderProps["orientation"]
}) => (
  <Slider
    aria-label="slider-2"
    colorScheme="red"
    orientation={props.orientation}
    isReversed={props.isReversed || undefined}
    defaultValue={props.defaultValue || defaultValue}
  >
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb />
  </Slider>
)

test("passes a11y test", async () => {
  await testA11y(<SimpleSlider />)
})

test("should move the thumb", () => {
  const { getByRole } = render(<SimpleSlider />)

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

test("renders & move correctly when orientation: vertical & isReversed", () => {
  const { getByRole } = render(
    <SimpleSlider orientation="vertical" isReversed />,
  )

  const thumb = getByRole("slider")

  press.ArrowUp(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  press.ArrowDown(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direciton under 'rtl'", () => {
  const { getByRole } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider />
    </ThemeProvider>,
  )

  const thumb = getByRole("slider")

  press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "8")

  press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direciton under 'rtl' & isReversed", () => {
  const { getByRole } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider isReversed />
    </ThemeProvider>,
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

test("renders correctly/unaffected by 'rtl' when orientation: vertical", () => {
  const { getByRole } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider orientation="vertical" />
    </ThemeProvider>,
  )

  const thumb = getByRole("slider")

  press.ArrowRight(thumb)
  press.ArrowUp(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  press.ArrowDown(thumb)
  press.ArrowLeft(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})
