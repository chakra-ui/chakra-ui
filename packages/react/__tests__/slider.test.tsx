import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { Slider } from "../src"

const Component = (props: Slider.RootProps) => (
  <Slider.Root
    aria-label="slider-2"
    colorPalette="red"
    defaultValue={props.defaultValue || 10}
    {...props}
  >
    <Slider.Control>
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider.Control>
  </Slider.Root>
)

describe("Slider", () => {
  test("passes a11y test", async () => {
    await testA11y(<Component />)
  })

  test("horizontal", async () => {
    render(<Component />)

    const thumb = screen.getByRole("slider")
    fireEvent.focus(thumb)

    fireEvent.keyDown(thumb, { key: "ArrowRight" })
    expect(thumb).toHaveAttribute("aria-valuenow", "11")

    fireEvent.keyDown(thumb, { key: "ArrowRight" })
    expect(thumb).toHaveAttribute("aria-valuenow", "12")

    fireEvent.keyDown(thumb, { key: "Home" })
    expect(thumb).toHaveAttribute("aria-valuenow", "0")

    fireEvent.keyDown(thumb, { key: "End" })
    expect(thumb).toHaveAttribute("aria-valuenow", "100")
  })

  test("vertical", async () => {
    render(<Component orientation="vertical" />)

    const thumb = screen.getByRole("slider")
    fireEvent.focus(thumb)

    fireEvent.keyDown(thumb, { key: "ArrowUp" })
    expect(thumb).toHaveAttribute("aria-valuenow", "11")

    fireEvent.keyDown(thumb, { key: "ArrowUp" })
    expect(thumb).toHaveAttribute("aria-valuenow", "12")

    fireEvent.keyDown(thumb, { key: "Home" })
    expect(thumb).toHaveAttribute("aria-valuenow", "0")

    fireEvent.keyDown(thumb, { key: "End" })
    expect(thumb).toHaveAttribute("aria-valuenow", "100")
  })
})
