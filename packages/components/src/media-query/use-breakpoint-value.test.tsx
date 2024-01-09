import { ThemeProvider } from "../system"
import { render, screen } from "@chakra-ui/test-utils"
import MatchMediaMock from "vitest-matchmedia-mock"
import { useBreakpointValue } from "."
import { queries, theme } from "./breakpoint.fixture"

let matchMedia: MatchMediaMock

describe("with object", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
  })

  const values = {
    base: "__base__",
    sm: "__sm__",
    md: "__md__",
    lg: "__lg__",
    xl: "__xl__",
    "2xl": "__2xl__",
    customBreakpoint: "__customBreakpoint__",
  }

  test("uses base value if smaller than sm", () => {
    renderWithQuery(values, queries.base)

    Object.keys(values).forEach((key) => {
      if (key === "__base__") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("sm", () => {
    renderWithQuery(values, queries.sm)

    Object.keys(values).forEach((key) => {
      if (key === "__sm__") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("md", () => {
    renderWithQuery(values, queries.md)

    Object.keys(values).forEach((key) => {
      if (key === "__md__") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("lg", () => {
    renderWithQuery(values, queries.lg)

    Object.keys(values).forEach((key) => {
      if (key === "__lg__") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("xl", () => {
    renderWithQuery(values, queries.xl)

    Object.keys(values).forEach((key) => {
      if (key === "__xl__") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("2xl", () => {
    renderWithQuery(values, queries.xl)

    Object.keys(values).forEach((key) => {
      if (key === "__2xl__") {
        expect(screen.getByText(key)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(key)).not.toBeInTheDocument()
      }
    })
  })

  test("customBreakpoint", () => {
    renderWithQuery(values, queries.customBreakpoint)

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
    "value5",
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
      if (value === "value5") {
        expect(screen.getByText(value)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      }
    })
  })

  test("2xl", () => {
    renderWithQuery(values, queries["2xl"])

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

function renderWithQuery(values: any, query: string) {
  matchMedia.useMediaQuery(query)
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
