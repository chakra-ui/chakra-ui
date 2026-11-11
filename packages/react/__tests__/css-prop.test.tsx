import { Box, Circle, Flex, Square } from "@chakra-ui/react"
import { render } from "./core/render"

describe("css prop", () => {
  it("applies an array css prop on Box", () => {
    const { getByTestId } = render(
      <Box data-testid="box" css={[{ position: "fixed" }]} />,
    )
    expect(getByTestId("box")).toHaveStyle({ position: "fixed" })
  })

  it("applies an array css prop on Flex alongside its layout styles", () => {
    const { getByTestId } = render(
      <Flex
        data-testid="flex"
        direction="column"
        css={[{ position: "fixed" }]}
      />,
    )
    expect(getByTestId("flex")).toHaveStyle({ position: "fixed" })
    expect(getByTestId("flex")).toHaveStyle({ flexDirection: "column" })
  })

  it("applies an array css prop on Square alongside its centering styles", () => {
    const { getByTestId } = render(
      <Square data-testid="square" size="10" css={[{ position: "fixed" }]} />,
    )
    expect(getByTestId("square")).toHaveStyle({ position: "fixed" })
    expect(getByTestId("square")).toHaveStyle({ alignItems: "center" })
  })

  it("applies an array css prop on Circle, which renders through Square", () => {
    const { getByTestId } = render(
      <Circle data-testid="circle" size="10" css={[{ position: "fixed" }]} />,
    )
    expect(getByTestId("circle")).toHaveStyle({ position: "fixed" })
    expect(getByTestId("circle")).toHaveStyle({ borderRadius: "9999px" })
  })

  it("applies an object css prop on Flex alongside its layout styles", () => {
    const { getByTestId } = render(
      <Flex
        data-testid="flex"
        direction="column"
        css={{ position: "fixed" }}
      />,
    )
    expect(getByTestId("flex")).toHaveStyle({ position: "fixed" })
    expect(getByTestId("flex")).toHaveStyle({ flexDirection: "column" })
  })

  it("applies an object css prop on Square alongside its centering styles", () => {
    const { getByTestId } = render(
      <Square data-testid="square" size="10" css={{ position: "fixed" }} />,
    )
    expect(getByTestId("square")).toHaveStyle({ position: "fixed" })
    expect(getByTestId("square")).toHaveStyle({ alignItems: "center" })
  })

  it("lets the css prop win over a base style it collides with on Flex", () => {
    const { getByTestId } = render(
      <Flex
        data-testid="flex"
        direction="column"
        css={{ flexDirection: "row" }}
      />,
    )
    expect(getByTestId("flex")).toHaveStyle({ flexDirection: "row" })
  })

  it("lets the css prop win over a base style it collides with on Square", () => {
    const { getByTestId } = render(
      <Square data-testid="square" size="10" css={{ alignItems: "start" }} />,
    )
    expect(getByTestId("square")).toHaveStyle({ alignItems: "start" })
  })
})
