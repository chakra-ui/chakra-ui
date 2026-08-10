import { chakra } from "@chakra-ui/react"
import { render } from "./core/render"

const getInjectedCss = () =>
  Array.from(document.querySelectorAll("style"))
    .map((style) => style.textContent ?? "")
    .join("")

describe("chakra factory recipe merge", () => {
  it("merges a base recipe with an override config when composed", () => {
    const Base = chakra("div", {
      base: { zIndex: "1" },
      variants: {
        tone: {
          solid: { opacity: "0.5" },
          subtle: { opacity: "0.8" },
        },
      },
      defaultVariants: { tone: "solid" },
    })

    const Composed = chakra(Base, {
      base: { zIndex: "2" },
    })

    const { getByTestId } = render(<Composed data-testid="composed" />)

    // renders without throwing (previously merging recipes crashed)
    expect(getByTestId("composed")).toBeInTheDocument()

    const css = getInjectedCss()
    // override base wins over the base recipe
    expect(css).toContain("z-index:2")
    // variant styles from the base recipe survive the merge (default variant)
    expect(css).toContain("opacity:0.5")
  })

  it("lets the composed variant props override the base recipe", () => {
    const Base = chakra("div", {
      base: {},
      variants: {
        tone: {
          solid: { opacity: "0.5" },
          subtle: { opacity: "0.8" },
        },
      },
      defaultVariants: { tone: "solid" },
    })

    const Composed = chakra(Base, {})

    render(<Composed data-testid="composed" tone="subtle" />)

    expect(getInjectedCss()).toContain("opacity:0.8")
  })
})
