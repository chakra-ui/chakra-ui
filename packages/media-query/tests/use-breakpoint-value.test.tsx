import React from "react"
import { ThemeProvider } from "@chakra-ui/system"
import { render, screen } from "@chakra-ui/test-utils"
import MatchMediaMock from "jest-matchmedia-mock"
import { theme, queries } from "./test-data"
import { useBreakpointValue } from "../src"

let matchMedia: any

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})

afterEach(() => {
  matchMedia.clear()
})

describe("with object", () => {
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
  const values = ["base", "sm", "md", "lg", "xl", "customBreakpoint"]

  test("uses base value if smaller than sm", () => {
    renderWithQuery(values, queries.base)
    expect(screen.getByText("base")).toBeInTheDocument()
  })

  test("sm", () => {
    renderWithQuery(values, queries.sm)

    values.forEach((value) => {
      if (value === "sm") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("md", () => {
    renderWithQuery(values, queries.md)

    values.forEach((value) => {
      if (value === "md") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("lg", () => {
    renderWithQuery(values, queries.lg)

    values.forEach((value) => {
      if (value === "lg") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("xl", () => {
    renderWithQuery(values, queries.xl)

    values.forEach((value) => {
      if (value === "xl") {
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
    renderWithQuery(["base"], queries.sm)
    expect(screen.getByText("base")).toBeInTheDocument()
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

const TestComponent = ({ values }: { values: any }) => {
  const value = useBreakpointValue(values)
  return <>{value}</>
}
