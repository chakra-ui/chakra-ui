import { ThemeProvider } from "../system"
import { renderToStaticMarkup } from "react-dom/server"
import { useBreakpointValue } from "."
import { theme } from "./breakpoint.fixture"

beforeEach(() => {
  vi.resetAllMocks()
})

describe("with defaultBreakpoint", () => {
  // NOTE: We do not set up matchMedia as we wish to simulate an SSR environment
  const breakpoints = {
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    customBreakpoint: "customBreakpoint",
  }

  test("sm", () => {
    const html = ssrRenderWithDefaultBreakpoint(breakpoints, "sm")

    Object.keys(breakpoints).forEach((key) => {
      if (key === "sm") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("md", () => {
    const html = ssrRenderWithDefaultBreakpoint(breakpoints, "md")

    Object.keys(breakpoints).forEach((key) => {
      if (key === "md") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("lg", () => {
    const html = ssrRenderWithDefaultBreakpoint(breakpoints, "lg")

    Object.keys(breakpoints).forEach((key) => {
      if (key === "lg") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("xl", () => {
    const html = ssrRenderWithDefaultBreakpoint(breakpoints, "xl")

    Object.keys(breakpoints).forEach((key) => {
      if (key === "xl") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("customBreakpoint", () => {
    const html = ssrRenderWithDefaultBreakpoint(breakpoints, "customBreakpoint")

    Object.keys(breakpoints).forEach((key) => {
      if (key === "customBreakpoint") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("base value is used if no breakpoint matches", () => {
    const breakpoints = { base: "base", md: "md" }
    const html = ssrRenderWithDefaultBreakpoint(breakpoints, "sm")
    expect(html).toContain("base")
  })
})

function ssrRenderWithDefaultBreakpoint(
  breakpoints: any,
  defaultBreakpoint: string,
) {
  return renderToStaticMarkup(
    <ThemeProvider theme={theme}>
      <TestComponent
        breakpoints={breakpoints}
        defaultBreakpoint={defaultBreakpoint}
      />
    </ThemeProvider>,
  )
}

const TestComponent = ({
  breakpoints,
  defaultBreakpoint = undefined,
}: {
  breakpoints: any
  defaultBreakpoint?: string
}) => {
  const value = useBreakpointValue(breakpoints, defaultBreakpoint)
  return <>{value}</>
}
