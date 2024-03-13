import { focus, render, screen, testA11y } from "@chakra-ui/test-utils"
import { Slider } from "../src"

const Component = (props: Slider.RootProps) => (
  <Slider.Root
    aria-label="slider-2"
    colorScheme="red"
    orientation={props.orientation}
    isReversed={props.isReversed || undefined}
    defaultValue={props.defaultValue || 10}
    {...props}
  >
    <Slider.Track>
      <Slider.FilledTrack />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Root>
)

test("passes a11y test", async () => {
  Object.defineProperty(window, "requestAnimationFrame", {
    value: vi.fn((cb) => cb()),
  })
  await testA11y(<Component />)
})

test("should move the thumb", async () => {
  const { user } = render(<Component />)

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
  const { user } = render(<Component orientation="vertical" isReversed />)

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
