import { render, act } from "@chakra-ui/test-utils"
import * as React from "react"
import { Image, ImageProps } from "../src"

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

function renderComponent(props?: ImageProps) {
  return render(
    <Image data-testid="img" src={src} fallbackSrc={fallbackSrc} {...props} />,
  )
}

test("creates an instance of Image when mounted", () => {
  const tools = renderComponent()
  const image = tools.getByTestId("img")
  expect(image).toBeInstanceOf(HTMLImageElement)
})

test("should render placeholder first, before image load", async () => {
  const tools = renderComponent()
  const image = tools.getByTestId("img")
  expect(image).toHaveAttribute("src", fallbackSrc)
})

/**
 * Not sure of the correctness of this test:
 * @see https://www.tfzx.net/article/4859040.html
 */
test("should fires onload", () => {
  trackImageOnload()

  const onLoad = jest.fn()
  const tools = renderComponent({ onLoad })

  const image = tools.getByTestId("img")

  act(() => {
    imageOnload()
  })

  expect(image).toHaveAttribute("src", src)
  expect(onLoad).toHaveBeenCalled()
})
