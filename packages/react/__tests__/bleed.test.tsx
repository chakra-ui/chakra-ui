import { Bleed } from "@chakra-ui/react"
import { render } from "./core/render"

describe("Bleed", () => {
  it("keeps a custom css prop alongside its negative-margin styles", () => {
    const { getByTestId } = render(
      <Bleed data-testid="bleed" inline="4" css={{ position: "fixed" }} />,
    )
    expect(getByTestId("bleed")).toHaveStyle({ position: "fixed" })
  })
})
