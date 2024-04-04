import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { RangeSlider } from "../src"

const DemoSlider = () => {
  return (
    <RangeSlider.Root
      aria-label={["leftThumb", "rightThumb"]}
      min={1}
      max={100}
      defaultValue={[40, 80]}
    >
      <RangeSlider.Control>
        <RangeSlider.Track>
          <RangeSlider.FilledTrack />
        </RangeSlider.Track>
        <RangeSlider.Thumb index={0} />
        <RangeSlider.Thumb index={1} />
      </RangeSlider.Control>
    </RangeSlider.Root>
  )
}

const getThumbs = () => screen.getAllByRole("slider")

describe("Range Slider", () => {
  test("passes a11y test", async () => {
    await testA11y(<DemoSlider />)
  })

  test("should move the left thumb with an arrow key", async () => {
    render(<DemoSlider />)

    const [leftThumb] = screen.getAllByRole("slider")
    fireEvent.focus(leftThumb)

    fireEvent.keyDown(leftThumb, { key: "ArrowRight" })
    expect(leftThumb).toHaveAttribute("aria-valuenow", "41")
  })

  test("should move the right thumb with an arrow key", async () => {
    render(<DemoSlider />)

    const [, rightThumb] = getThumbs()
    fireEvent.focus(rightThumb)

    fireEvent.keyDown(rightThumb, { key: "ArrowRight" })
    expect(rightThumb).toHaveAttribute("aria-valuenow", "81")
  })

  test("should increment a thumb by 10 position pressing the page-up key", async () => {
    render(<DemoSlider />)

    const [leftThumb] = getThumbs()
    fireEvent.focus(leftThumb)

    fireEvent.keyDown(leftThumb, { key: "PageUp" })
    expect(leftThumb).toHaveAttribute("aria-valuenow", "50")
  })

  test("should decrement a thumb by 10 position pressing the page-down key", async () => {
    render(<DemoSlider />)

    const [leftThumb] = getThumbs()
    fireEvent.focus(leftThumb)

    fireEvent.keyDown(leftThumb, { key: "PageDown" })
    expect(leftThumb).toHaveAttribute("aria-valuenow", "30")
  })

  test("should set a thumb to its minimum value when pressing the home key", async () => {
    render(<DemoSlider />)

    const [, rightThumb] = getThumbs()
    fireEvent.focus(rightThumb)

    fireEvent.keyDown(rightThumb, { key: "Home" })
    expect(rightThumb).toHaveAttribute("aria-valuenow", "40")
  })

  test("should set a thumb to its maximum value when pressing the end key", async () => {
    render(<DemoSlider />)

    const [, rightThumb] = getThumbs()
    fireEvent.focus(rightThumb)

    fireEvent.keyDown(rightThumb, { key: "End" })
    expect(rightThumb).toHaveAttribute("aria-valuenow", "100")
  })
})
