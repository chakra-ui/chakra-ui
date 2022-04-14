import { extendTheme, ThemeProvider } from "@chakra-ui/react"
import { screen, render, testA11y } from "@chakra-ui/test-utils"
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
  const { user } = render(<SimpleSlider />)

  const thumb = screen.getByRole("slider")

  await user.press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  await user.press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await user.press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders & move correctly when orientation: vertical & isReversed", async () => {
  const { user } = render(<SimpleSlider orientation="vertical" isReversed />)

  const thumb = screen.getByRole("slider")

  await user.press.ArrowUp(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  await user.press.ArrowDown(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  await user.press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direction under 'rtl'", async () => {
  const { user } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider />
    </ThemeProvider>,
  )

  const thumb = screen.getByRole("slider")

  await user.press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  await user.press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "8")

  await user.press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direction under 'rtl' & isReversed", async () => {
  const { user } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider isReversed />
    </ThemeProvider>,
  )

  const thumb = screen.getByRole("slider")

  await user.press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  await user.press.ArrowRight(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await user.press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.press.End(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders correctly/unaffected by 'rtl' when orientation: vertical", async () => {
  const { user } = render(
    <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
      <SimpleSlider orientation="vertical" />
    </ThemeProvider>,
  )

  const thumb = screen.getByRole("slider")

  await user.press.ArrowRight(thumb)
  await user.press.ArrowUp(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await user.press.ArrowDown(thumb)
  await user.press.ArrowLeft(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  await user.press.Home(thumb)
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.press.End(thumb)
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
