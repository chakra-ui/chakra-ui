import { createBreakpoints } from "@chakra-ui/theme-tools"
import { css, toCSSVar } from "../src"

test("should handle array interpolations", () => {
  const customBreakpoints = createBreakpoints({
    sm: "40em",
    md: "50em",
    lg: "60em",
    xl: "70em",
  })

<<<<<<< HEAD
  // @ts-ignore
=======
>>>>>>> 66fc8e9b8 (chore: resolve type-check errors)
  const result = css({ "&": [{ bg: "red" }, { bg: "green" }] })(
    toCSSVar({
      breakpoints: customBreakpoints,
    }),
  )

  expect(result).toEqual({
    "&": { background: "red" },
    "@media screen and (min-width: 40em)": { "&": { background: "green" } },
  })
})
