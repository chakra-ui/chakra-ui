import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { ThemeProvider } from "@chakra-ui/system"
import { render, screen } from "@chakra-ui/test-utils"
import MatchMediaMock from "jest-matchmedia-mock"
import { theme, queries } from "./test-data"
import { useBreakpointValue } from "../src"

let matchMedia: any

describe("with object", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
  })

  const values = {
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    customBreakpoint: "customBreakpoint",
  }

  test("uses base value if smaller than sm", () => {
    renderWithQuery(values, queries.base)

    Object.keys(values).forEach((key) => {
      if (key === "base") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("sm", () => {
    renderWithQuery(values, queries.sm)

    Object.keys(values).forEach((key) => {
      if (key === "sm") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("md", () => {
    renderWithQuery(values, queries.md)

    Object.keys(values).forEach((key) => {
      if (key === "md") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("lg", () => {
    renderWithQuery(values, queries.lg)

    Object.keys(values).forEach((key) => {
      if (key === "lg") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("xl", () => {
    renderWithQuery(values, queries.xl)

    Object.keys(values).forEach((key) => {
      if (key === "xl") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("customBreakpoint", () => {
    renderWithQuery(values, queries.customBreakpoint)

    Object.keys(values).forEach((key) => {
      if (key === "customBreakpoint") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("base value is used if no breakpoint matches", () => {
    const values = { base: "base", md: "md" }
    renderWithQuery(values, queries.sm)
    expect(screen.getByText("base")).toBeInTheDocument()
  })
})

describe("with array", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
  })

  const values = [
    "baseValue",
    "value2",
    "value3",
    "value4",
    "anotherValue",
    "customBreakpoint",
  ]

  test("uses base value if smaller than sm", () => {
    renderWithQuery(values, queries.base)
    expect(screen.getByText("baseValue")).toBeInTheDocument()
  })

  test("sm", () => {
    renderWithQuery(values, queries.sm)

    values.forEach((value) => {
      if (value === "value2") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("md", () => {
    renderWithQuery(values, queries.md)

    values.forEach((value) => {
      if (value === "value3") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("lg", () => {
    renderWithQuery(values, queries.lg)

    values.forEach((value) => {
      if (value === "value4") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("xl", () => {
    renderWithQuery(values, queries.xl)

    values.forEach((value) => {
      if (value === "anotherValue") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("customBreakpoint", () => {
    renderWithQuery(values, queries.customBreakpoint)

    values.forEach((value) => {
      if (value === "customBreakpoint") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("uses base value if no breakpoint matches", () => {
    renderWithQuery(["baseValue"], queries.sm)
    expect(screen.getByText("baseValue")).toBeInTheDocument()
  })
})

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

function renderWithQuery(values: any, query: string) {
  matchMedia.useMediaQuery(query)
  return render(
    <ThemeProvider theme={theme}>
      <TestComponent values={values} />
    </ThemeProvider>,
  )
}

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
