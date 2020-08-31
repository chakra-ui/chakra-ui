import { render, act, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Image } from "../src"

const src = "https://image.xyz/source"
const fallbackSrc = "https://image.xyz/placeholder"

let imageOnload: any = null

/**
 * Override Image global to save onload
 * setting here so that I can trigger it manually in my test
 */
function trackImageOnload() {
  Object.defineProperty(window.Image.prototype, "onload", {
    get: function () {
      return this._onload
    },
    set: function (fn) {
      imageOnload = fn
      this._onload = fn
    },
  })
}

test("creates an instance of Image when mounted", () => {
  render(<Image src={src} fallbackSrc={fallbackSrc} />)

  expect(screen.getByRole("img")).toBeInstanceOf(HTMLImageElement)
})

it("passes a11y test", async () => {
  await testA11y(<Image alt="img" src={src} fallbackSrc={fallbackSrc} />)
})

test("renders placeholder first, before image load", async () => {
  render(<Image src={src} fallbackSrc={fallbackSrc} />)

  expect(screen.getByRole("img")).toHaveAttribute("src", fallbackSrc)
})

/**
 * Not sure of the correctness of this test:
 * @see https://www.tfzx.net/article/4859040.html
 */
test("fires onload", () => {
  trackImageOnload()

  const onLoad = jest.fn()

  render(<Image src={src} fallbackSrc={fallbackSrc} onLoad={onLoad} />)

  act(() => {
    imageOnload()
  })

  expect(screen.getByRole("img")).toHaveAttribute("src", src)
  expect(onLoad).toHaveBeenCalled()
})
