import { css } from "../src"
import { createBreakpoints } from "@chakra-ui/theme-tools"

test("should handle array interpolations", () => {
  const customBreakpoints = createBreakpoints({
    sm: "40em",
    md: "50em",
    lg: "60em",
    xl: "70em",
  })

  // @ts-expect-error "&" is technically disallowed
  const result = css({ "&": [{ bg: "red" }, { bg: "green" }] })({
    breakpoints: customBreakpoints,
  })

  expect(result).toEqual({
    "&": { background: "red" },
    "@media screen and (min-width: 40em)": { "&": { background: "green" } },
  })
})
