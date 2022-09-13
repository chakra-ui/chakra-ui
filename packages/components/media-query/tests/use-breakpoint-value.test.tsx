import { ThemeProvider } from "@chakra-ui/system"
import { render, screen } from "@chakra-ui/test-utils"
import React from "react"
import { useBreakpointValue } from "../src"
import MatchMedia from "./matchmedia-mock-plus"
import { theme, widths } from "./test-data"

describe("useBreakpointValue", () => {
  let matchMedia: MatchMedia
  let originalWidth: number

  beforeAll(() => {
    originalWidth = window.innerWidth
  })

  beforeEach(() => {
    matchMedia = new MatchMedia()
  })

  afterEach(() => {
    matchMedia.destroy()
    window.innerWidth = originalWidth
  })

  describe("with object", () => {
    const values = {
      base: "__base__",
      sm: "__sm__",
      md: "__md__",
      lg: "__lg__",
      xl: "__xl__",
      "2xl": "__2xl__",
      customBreakpoint: "__customBreakpoint__",
    } as const

    test("uses base value if smaller than sm", () => {
      renderWithQuery(values, widths.base)

      Object.keys(values).forEach((key) => {
        if (key === "__base__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("sm", () => {
      renderWithQuery(values, widths.sm)

      Object.keys(values).forEach((key) => {
        if (key === "__sm__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("md", () => {
      renderWithQuery(values, widths.md)

      Object.keys(values).forEach((key) => {
        if (key === "__md__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("lg", () => {
      renderWithQuery(values, widths.lg)

      Object.keys(values).forEach((key) => {
        if (key === "__lg__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("xl", () => {
      renderWithQuery(values, widths.xl)

      Object.keys(values).forEach((key) => {
        if (key === "__xl__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("2xl", () => {
      renderWithQuery(values, widths.xl)

      Object.keys(values).forEach((key) => {
        if (key === "__2xl__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("customBreakpoint", () => {
      renderWithQuery(values, widths.customBreakpoint)

      Object.keys(values).forEach((key) => {
        if (key === "__customBreakpoint__") {
          expect(screen.getByText(key)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(key)).not.toBeInTheDocument()
        }
      })
    })

    test("base value is used if no breakpoint matches", () => {
      const values = { base: "base", md: "md" }
      renderWithQuery(values, widths.sm)
      expect(screen.getByText("base")).toBeInTheDocument()
    })
  })

  describe("with array", () => {
    const values = [
      "baseValue",
      "value2",
      "value3",
      "value4",
      "value5",
      "anotherValue",
      "customBreakpoint",
    ]

    test("uses base value if smaller than sm", () => {
      renderWithQuery(values, widths.base)
      expect(screen.getByText("baseValue")).toBeInTheDocument()
    })

    test("sm", () => {
      renderWithQuery(values, widths.sm)

      values.forEach((value) => {
        if (value === "value2") {
          expect(screen.getByText(value)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(value)).not.toBeInTheDocument()
        }
      })
    })

    test("md", () => {
      renderWithQuery(values, widths.md)

      values.forEach((value) => {
        if (value === "value3") {
          expect(screen.getByText(value)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(value)).not.toBeInTheDocument()
        }
      })
    })

    test("lg", () => {
      renderWithQuery(values, widths.lg)

      values.forEach((value) => {
        if (value === "value4") {
          expect(screen.getByText(value)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(value)).not.toBeInTheDocument()
        }
      })
    })

    test("xl", () => {
      renderWithQuery(values, widths.xl)

      values.forEach((value) => {
        if (value === "value5") {
          expect(screen.getByText(value)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(value)).not.toBeInTheDocument()
        }
      })
    })

    test("2xl", () => {
      renderWithQuery(values, widths["2xl"])

      values.forEach((value) => {
        if (value === "anotherValue") {
          expect(screen.getByText(value)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(value)).not.toBeInTheDocument()
        }
      })
    })

    test("customBreakpoint", () => {
      renderWithQuery(values, widths.customBreakpoint)

      values.forEach((value) => {
        if (value === "customBreakpoint") {
          expect(screen.getByText(value)).toBeInTheDocument()
        } else {
          expect(screen.queryByText(value)).not.toBeInTheDocument()
        }
      })
    })

    test("uses base value if no breakpoint matches", () => {
      renderWithQuery(["baseValue"], widths.sm)
      expect(screen.getByText("baseValue")).toBeInTheDocument()
    })
  })

  function renderWithQuery(values: any, width: number) {
    window.innerWidth = width

    return render(
      <ThemeProvider theme={theme}>
        <TestComponent values={values} />
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
})
