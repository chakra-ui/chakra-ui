import { breakpoints } from "./test-data"
import createMediaQueries from "../src/create-media-query"

test("creates media queries for each named breakpoint", () => {
  expect(createMediaQueries(breakpoints)).toEqual([
    {
      breakpoint: "xl",
      maxWidth: undefined,
      minWidth: "400px",
      query: "(min-width: 400px)",
    },
    {
      breakpoint: "lg",
      maxWidth: "400px",
      minWidth: "300px",
      query: "(min-width: 300px) and (max-width: 399.99px)",
    },
    {
      breakpoint: "md",
      maxWidth: "300px",
      minWidth: "200px",
      query: "(min-width: 200px) and (max-width: 299.99px)",
    },
    {
      breakpoint: "sm",
      maxWidth: "200px",
      minWidth: "100px",
      query: "(min-width: 100px) and (max-width: 199.99px)",
    },
  ])
})
