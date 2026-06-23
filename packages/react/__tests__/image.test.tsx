import { Image } from "@chakra-ui/react"
import { render } from "./core/render"

describe("Image", () => {
  it("keeps the chakra-image class when a className is passed", () => {
    const { getByRole } = render(
      <Image className="custom-image" alt="example" />,
    )
    const img = getByRole("img")
    expect(img).toHaveClass("chakra-image")
    expect(img).toHaveClass("custom-image")
  })
})
