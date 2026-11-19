import { screen } from "@testing-library/react"
import {
  ColorModeButton,
  DarkMode,
  LightMode,
} from "compositions/ui/color-mode"
import { render } from "./core/render"

describe("DarkMode / LightMode snippet", () => {
  it("applies the dark theme class", () => {
    const { getByTestId } = render(<DarkMode data-testid="scope" />)
    expect(getByTestId("scope")).toHaveClass("chakra-theme", "dark")
  })

  it("keeps the dark theme class when a className is passed", () => {
    const { getByTestId } = render(
      <DarkMode data-testid="scope" className="custom" />,
    )
    const el = getByTestId("scope")
    expect(el).toHaveClass("chakra-theme", "dark")
    expect(el).toHaveClass("custom")
  })

  it("applies the light theme class", () => {
    const { getByTestId } = render(<LightMode data-testid="scope" />)
    expect(getByTestId("scope")).toHaveClass("chakra-theme", "light")
  })

  it("keeps the light theme class when a className is passed", () => {
    const { getByTestId } = render(
      <LightMode data-testid="scope" className="custom" />,
    )
    const el = getByTestId("scope")
    expect(el).toHaveClass("chakra-theme", "light")
    expect(el).toHaveClass("custom")
  })
})

describe("ColorModeButton snippet", () => {
  it("keeps a css prop passed by the user", async () => {
    render(<ColorModeButton css={{ color: "rgb(255, 0, 0)" }} />)
    const button = await screen.findByRole("button")
    expect(button).toHaveStyle({ color: "rgb(255, 0, 0)" })
  })
})
