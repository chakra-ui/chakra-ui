import { extendTheme, ThemeProvider } from "@chakra-ui/react"
import { press, render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import styled from "@emotion/styled"
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

const StyledSlider = styled(Slider)`
  width: 400px;
  background-color: pink;
`

// This gets applied to SliderTrack!
const StyledSliderTrack = styled(SliderTrack)`
  background-color: blue;
`

// This doesn't get applied to SliderFilledTrack,
const StyledSliderFilledTrack = styled(SliderFilledTrack)`
  background-color: green;
`
// This gets applied to SliderThumb!
const StyledSliderThumb = styled(SliderThumb)`
  background-color: red;
`

const SimpleStyledSlider = (props: {
  defaultValue?: number
  isReversed?: boolean
  orientation?: UseSliderProps["orientation"]
}) => (
  <StyledSlider
    data-testid="slider"
    aria-label="slider-2"
    colorScheme="red"
    orientation={props.orientation}
    isReversed={props.isReversed || undefined}
    defaultValue={props.defaultValue || defaultValue}
  >
    <StyledSliderTrack data-testid="slider-track">
      <StyledSliderFilledTrack data-testid="slider-filled-track" />
    </StyledSliderTrack>
    <StyledSliderThumb data-testid="slider-thumb" />
  </StyledSlider>
)

test("passes a11y test", async () => {
  Object.defineProperty(window, "requestAnimationFrame", {
    value: jest.fn((cb) => cb()),
  })
  await testA11y(<SimpleSlider />)
})

test("should move the thumb", async () => {
  const { getByRole } = render(<SimpleSlider />)

  const thumb = getByRole("slider")

  await press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  await press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders & move correctly when orientation: vertical & isReversed", async () => {
  const { getByRole } = render(
    <SimpleSlider orientation="vertical" isReversed />,
  )

  const thumb = getByRole("slider")

  await press.ArrowUp(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  await press.ArrowDown(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  await press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direction under 'rtl'", async () => {
  const { getByRole } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider />
    </ThemeProvider>,
  )

  const thumb = getByRole("slider")

  await press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  await press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "8")

  await press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direction under 'rtl' & isReversed", async () => {
  const { getByRole } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider isReversed />
    </ThemeProvider>,
  )

  const thumb = getByRole("slider")

  await press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  await press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders correctly/unaffected by 'rtl' when orientation: vertical", async () => {
  const { getByRole } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider orientation="vertical" />
    </ThemeProvider>,
  )

  const thumb = getByRole("slider")

  await press.ArrowRight(thumb)
  await press.ArrowUp(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await press.ArrowDown(thumb)
  await press.ArrowLeft(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  await press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("should have colors from styled", async () => {
  const { getByTestId } = render(<SimpleStyledSlider />)
  let sliderElement = getByTestId("slider")
  let styles = getComputedStyle(sliderElement)

  expect(styles.backgroundColor).toBe("pink")

  sliderElement = getByTestId("slider-track")
  styles = getComputedStyle(sliderElement)

  expect(styles.backgroundColor).toBe("blue")

  sliderElement = getByTestId("slider-filled-track")
  styles = getComputedStyle(sliderElement)

  expect(styles.backgroundColor).toBe("green")

  sliderElement = getByTestId("slider-thumb")
  styles = getComputedStyle(sliderElement)

  expect(styles.backgroundColor).toBe("red")
})
