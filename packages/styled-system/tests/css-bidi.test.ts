import { createBreakpoints } from "@chakra-ui/theme-tools"
import { css } from "../src"

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
})

test("should transform logical css properties", () => {
  const result = css({
    floatBidi: "left",
    mtBidi: "sm",
    roundedLeftBidi: ["20px", "40px"],
    borderColor: "red",
  })({
    breakpoints,
    direction: "rtl",
    space: {
      sm: 40,
    },
  })
  expect(result).toHaveProperty("marginBlockStart")
  expect(result.marginBlockStart).toEqual(40)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "borderBottomRightRadius": "40px",
        "borderTopRightRadius": "40px",
      },
      "borderBottomRightRadius": "20px",
      "borderColor": "red",
      "borderTopRightRadius": "20px",
      "float": "right",
      "marginBlockStart": 40,
    }
  `)
})
