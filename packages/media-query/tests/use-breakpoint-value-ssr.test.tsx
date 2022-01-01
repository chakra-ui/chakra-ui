import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { ThemeProvider } from "@chakra-ui/system"
import { theme } from "./test-data"
import { useBreakpointValue } from "../src"

describe("with defaultBreakpoint", () => {
  // To clean up erroneous console warnings from react, we temporarliy force
  // useLayoutEffect to behave like useEffect. Since neither can run in our SSR
  // tests, it has no functional impact, but stops the huge console dumps that
  // React causes.
  let useLayoutEffect: typeof React.useLayoutEffect
  beforeAll(() => {
    useLayoutEffect = React.useLayoutEffect
    React.useLayoutEffect = React.useEffect
  })
  afterAll(() => {
    React.useLayoutEffect = useLayoutEffect
  })

  // NOTE: We do not setup matchMedia as we wish to simulate an SSR environment
  const values = {
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    customBreakpoint: "customBreakpoint",
  }

  test("sm", () => {
    const html = ssrRenderWithDefaultBreakpoint(values, "sm")

    Object.keys(values).forEach((key) => {
      if (key === "sm") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("md", () => {
    const html = ssrRenderWithDefaultBreakpoint(values, "md")

    Object.keys(values).forEach((key) => {
      if (key === "md") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("lg", () => {
    const html = ssrRenderWithDefaultBreakpoint(values, "lg")

    Object.keys(values).forEach((key) => {
      if (key === "lg") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("xl", () => {
    const html = ssrRenderWithDefaultBreakpoint(values, "xl")

    Object.keys(values).forEach((key) => {
      if (key === "xl") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("customBreakpoint", () => {
    const html = ssrRenderWithDefaultBreakpoint(values, "customBreakpoint")

    Object.keys(values).forEach((key) => {
      if (key === "customBreakpoint") {
        expect(html).toContain(key)
      } else {
        expect(html).not.toContain(key)
      }
    })
  })

  test("base value is used if no breakpoint matches", () => {
    const values = { base: "base", md: "md" }
    const html = ssrRenderWithDefaultBreakpoint(values, "sm")
    expect(html).toContain("base")
  })
})

function ssrRenderWithDefaultBreakpoint(
  values: any,
  defaultBreakpoint: string,
) {
  return renderToStaticMarkup(
    <ThemeProvider theme={theme}>
      <TestComponent values={values} defaultBreakpoint={defaultBreakpoint} />
    </ThemeProvider>,
  )
}

const TestComponent = ({
  values,
  defaultBreakpoint = undefined,
}: {
  values: any
  defaultBreakpoint?: string
}) => {
  const value = useBreakpointValue(values, defaultBreakpoint)
  return <>{value}</>
}
