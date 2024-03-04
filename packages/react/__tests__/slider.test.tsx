import { focus, render, screen, testA11y } from "@chakra-ui/test-utils"
import styled from "@emotion/styled"
import { Provider as ChakraProvider } from "../provider"
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  UseSliderProps,
} from "../src/components/slider"
import { theme as baseTheme } from "../src/theme"

const defaultValue = 10

const themeRtl = { ...baseTheme, direction: "rtl" }

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
    value: vi.fn((cb) => cb()),
  })
  await testA11y(<SimpleSlider />)
})

test("should move the thumb", async () => {
  const { user } = render(<SimpleSlider />)

  const thumb = screen.getByRole("slider")

  focus(thumb)

  await user.keyboard("[ArrowRight]")
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  await user.keyboard("[ArrowRight]")
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await user.keyboard("[Home]")
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.keyboard("[End]")
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders & move correctly when orientation: vertical & isReversed", async () => {
  const { user } = render(<SimpleSlider orientation="vertical" isReversed />)

  const thumb = screen.getByRole("slider")

  focus(thumb)

  await user.keyboard("[ArrowUp]")
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  await user.keyboard("[ArrowDown]")
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  await user.keyboard("[Home]")
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.keyboard("[End]")
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direction under 'rtl'", async () => {
  const { user } = render(
    <ChakraProvider theme={themeRtl}>
      <SimpleSlider />
    </ChakraProvider>,
  )

  const thumb = screen.getByRole("slider")

  focus(thumb)

  await user.keyboard("[ArrowRight]")
  expect(thumb).toHaveAttribute("aria-valuenow", "9")

  await user.keyboard("[ArrowRight]")
  expect(thumb).toHaveAttribute("aria-valuenow", "8")

  await user.keyboard("[Home]")
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.keyboard("[End]")
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders with the correct direction under 'rtl' & isReversed", async () => {
  const { user } = render(
    <ChakraProvider theme={themeRtl}>
      <SimpleSlider isReversed />
    </ChakraProvider>,
  )

  const thumb = screen.getByRole("slider")

  focus(thumb)

  await user.keyboard("[ArrowRight]")
  expect(thumb).toHaveAttribute("aria-valuenow", "11")

  await user.keyboard("[ArrowRight]")
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await user.keyboard("[Home]")
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.keyboard("[End]")
  expect(thumb).toHaveAttribute("aria-valuenow", "100")
})

test("renders correctly/unaffected by 'rtl' when orientation: vertical", async () => {
  const { user } = render(
    <ChakraProvider theme={themeRtl}>
      <SimpleSlider orientation="vertical" />
    </ChakraProvider>,
  )

  const thumb = screen.getByRole("slider")

  focus(thumb)

  await user.keyboard("[ArrowRight]")
  await user.keyboard("[ArrowUp]")
  expect(thumb).toHaveAttribute("aria-valuenow", "12")

  await user.keyboard("[ArrowDown]")
  await user.keyboard("[ArrowLeft]")
  expect(thumb).toHaveAttribute("aria-valuenow", "10")

  await user.keyboard("[Home]")
  expect(thumb).toHaveAttribute("aria-valuenow", "0")

  await user.keyboard("[End]")
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
