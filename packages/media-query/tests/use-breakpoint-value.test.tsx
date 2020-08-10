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
  const values = { base: "base", sm: "sm", md: "md", lg: "lg", xl: "xl" }

  test("uses base value if smaller than sm", () => {
    renderWithQuery(values, queries.base)
    expect(screen.getByText("base")).toBeInTheDocument()
  })

  test("sm", () => {
    renderWithQuery(values, queries.sm)
    expect(screen.getByText("sm")).toBeInTheDocument()
  })

  test("md", () => {
    renderWithQuery(values, queries.md)
    expect(screen.getByText("md")).toBeInTheDocument()
  })

  test("lg", () => {
    renderWithQuery(values, queries.lg)
    expect(screen.getByText("lg")).toBeInTheDocument()
  })

  test("xl", () => {
    renderWithQuery(values, queries.xl)
    expect(screen.getByText("xl")).toBeInTheDocument()
  })

  test("base value is used if no breakpoint matches", () => {
    const values = { base: "base", md: "md" }
    renderWithQuery(values, queries.sm)
    expect(screen.getByText("base")).toBeInTheDocument()
  })
})

describe("with array", () => {
  const values = ["base", "sm", "md", "lg", "xl"]

  test("uses base value if smaller than sm", () => {
    renderWithQuery(values, queries.base)
    expect(screen.getByText("base")).toBeInTheDocument()
  })

  test("sm", () => {
    renderWithQuery(values, queries.sm)
    expect(screen.getByText("sm")).toBeInTheDocument()
  })

  test("md", () => {
    renderWithQuery(values, queries.md)
    expect(screen.getByText("md")).toBeInTheDocument()
  })

  test("lg", () => {
    renderWithQuery(values, queries.lg)
    expect(screen.getByText("lg")).toBeInTheDocument()
  })

  test("xl", () => {
    renderWithQuery(values, queries.xl)
    expect(screen.getByText("xl")).toBeInTheDocument()
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
