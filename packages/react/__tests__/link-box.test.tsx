import { LinkOverlay } from "@chakra-ui/react"
import { render } from "./core/render"

describe("LinkOverlay", () => {
  it("forwards the rel attribute to the anchor", () => {
    const { getByRole } = render(
      <LinkOverlay href="https://example.com" rel="noopener noreferrer">
        link
      </LinkOverlay>,
    )
    expect(getByRole("link")).toHaveAttribute("rel", "noopener noreferrer")
  })
})
