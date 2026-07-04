import { Float } from "@chakra-ui/react"
import { render } from "./core/render"

describe("Float", () => {
  it("keeps its base positioning styles when a css prop is passed", () => {
    const { getByTestId } = render(
      <Float data-testid="float" css={{ color: "red" }} />,
    )
    expect(getByTestId("float")).toHaveStyle({ position: "absolute" })
  })
})
