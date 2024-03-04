import { act, render, screen, testA11y } from "@chakra-ui/test-utils"
import { Image } from "../src/components/image"

const src = "https://image.xyz/source"
const fallbackSrc = "https://image.xyz/placeholder"

let imageOnload: any = null

/**
 * Override Image global to save onload
 * setting here so that I can trigger it manually in my test
 */
function trackImageOnload() {
  Object.defineProperty(window.Image.prototype, "onload", {
    get() {
      return this._onload
    },
    set(fn) {
      imageOnload = fn
      this._onload = fn
    },
  })
}

test("creates an instance of Image when mounted", () => {
  render(<Image src={src} fallbackSrc={fallbackSrc} />)

  expect(screen.getByRole("img")).toBeInstanceOf(HTMLImageElement)
})

test("passes a11y test", async () => {
  await testA11y(<Image alt="img" src={src} fallbackSrc={fallbackSrc} />)
})

test("renders placeholder first, before image load", async () => {
  render(<Image src={src} fallbackSrc={fallbackSrc} />)

  expect(screen.getByRole("img")).toHaveAttribute("src", fallbackSrc)
})

test("renders image if there is no fallback behavior defined", async () => {
  render(<Image src={src} />)

  expect(screen.getByRole("img")).toHaveAttribute("src", src)
})

/**
 * Not sure of the correctness of this test:
 * @see https://www.tfzx.net/article/4859040.html
 */
test("fires onload", () => {
  trackImageOnload()

  const onLoad = vi.fn()

  render(<Image src={src} fallbackSrc={fallbackSrc} onLoad={onLoad} />)

  act(() => {
    imageOnload()
  })

  expect(screen.getByRole("img")).toHaveAttribute("src", src)
  expect(onLoad).toHaveBeenCalled()
})
