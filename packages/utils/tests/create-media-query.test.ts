import { createBreakpoints } from "@chakra-ui/theme-tools"
import { createMediaQueries } from "../src/create-media-query"

const breakpoints = createBreakpoints({
  base: "0px",
  sm: "100px",
  md: "200px",
  lg: "300px",
  xl: "400px",
  customBreakpoint: "500px",
})

test("creates media queries for each named breakpoint", () => {
  expect(createMediaQueries(breakpoints)).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoint": "base",
        "maxWidth": "100px",
        "mediaMaxWidth": "99px",
        "minWidth": "0px",
        "query": "(min-width: 0px) and (max-width: 99px)",
      },
      Object {
        "breakpoint": "sm",
        "maxWidth": "200px",
        "mediaMaxWidth": "199px",
        "minWidth": "100px",
        "query": "(min-width: 100px) and (max-width: 199px)",
      },
      Object {
        "breakpoint": "md",
        "maxWidth": "300px",
        "mediaMaxWidth": "299px",
        "minWidth": "200px",
        "query": "(min-width: 200px) and (max-width: 299px)",
      },
      Object {
        "breakpoint": "lg",
        "maxWidth": "400px",
        "mediaMaxWidth": "399px",
        "minWidth": "300px",
        "query": "(min-width: 300px) and (max-width: 399px)",
      },
      Object {
        "breakpoint": "xl",
        "maxWidth": "500px",
        "mediaMaxWidth": "499px",
        "minWidth": "400px",
        "query": "(min-width: 400px) and (max-width: 499px)",
      },
      Object {
        "breakpoint": "customBreakpoint",
        "maxWidth": undefined,
        "mediaMaxWidth": undefined,
        "minWidth": "500px",
        "query": "(min-width: 500px)",
      },
    ]
  `)
})

test("matches snapshot (order matters)", () => {
  const breakpoints = createBreakpoints({
    customBreakpoint: "20em",
    sm: "36em",
    md: "46.25em",
    lg: "60em",
    xs: "30em",
    xl: "78.125em",
    xxl: "95em",
  })

  expect(createMediaQueries(breakpoints)).toMatchInlineSnapshot(`
    Array [
      Object {
        "breakpoint": "base",
        "maxWidth": "20em",
        "mediaMaxWidth": "19.99em",
        "minWidth": "0em",
        "query": "(min-width: 0em) and (max-width: 19.99em)",
      },
      Object {
        "breakpoint": "customBreakpoint",
        "maxWidth": "30em",
        "mediaMaxWidth": "29.99em",
        "minWidth": "20em",
        "query": "(min-width: 20em) and (max-width: 29.99em)",
      },
      Object {
        "breakpoint": "xs",
        "maxWidth": "36em",
        "mediaMaxWidth": "35.99em",
        "minWidth": "30em",
        "query": "(min-width: 30em) and (max-width: 35.99em)",
      },
      Object {
        "breakpoint": "sm",
        "maxWidth": "46.25em",
        "mediaMaxWidth": "46.24em",
        "minWidth": "36em",
        "query": "(min-width: 36em) and (max-width: 46.24em)",
      },
      Object {
        "breakpoint": "md",
        "maxWidth": "60em",
        "mediaMaxWidth": "59.99em",
        "minWidth": "46.25em",
        "query": "(min-width: 46.25em) and (max-width: 59.99em)",
      },
      Object {
        "breakpoint": "lg",
        "maxWidth": "78.125em",
        "mediaMaxWidth": "78.115em",
        "minWidth": "60em",
        "query": "(min-width: 60em) and (max-width: 78.115em)",
      },
      Object {
        "breakpoint": "xl",
        "maxWidth": "95em",
        "mediaMaxWidth": "94.99em",
        "minWidth": "78.125em",
        "query": "(min-width: 78.125em) and (max-width: 94.99em)",
      },
      Object {
        "breakpoint": "xxl",
        "maxWidth": undefined,
        "mediaMaxWidth": undefined,
        "minWidth": "95em",
        "query": "(min-width: 95em)",
      },
    ]
  `)
})
