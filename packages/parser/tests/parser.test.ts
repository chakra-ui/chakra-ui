import { parser } from "../src"

const theme = {
  breakpoints: { sm: 320, md: 768, lg: 1000 },
  space: [0, 4, 8, 16, 32],
  colors: {
    primary: "rebeccapurple",
    secondary: "tomato",
    green: {
      100: "tomato",
      200: "papayawhip",
    },
  },
  fontSizes: {
    sm: "14px",
    md: "18px",
  },
  styles: {
    h1: {
      paddingX: 3,
      fontSize: "sm",
    },
  },
}

test("should parse array and object styles", () => {
  const styles = parser({
    theme,
    color: "green.200",
    marginX: [2, 4],
    paddingY: { base: "12px", sm: 4, lg: "90px" },
  })

  expect(styles).toBeDefined()

  expect(styles).toEqual({
    color: "papayawhip",
    marginLeft: 8,
    marginRight: 8,
    paddingBottom: "12px",
    paddingTop: "12px",
    "@media screen and (min-width: 320px)": {
      marginLeft: 32,
      marginRight: 32,
      paddingTop: 32,
      paddingBottom: 32,
    },
    "@media screen and (min-width: 1000px)": {
      paddingTop: "90px",
      paddingBottom: "90px",
    },
  })
})

test("should warn for deprecated style props", () => {
  parser({
    theme,
    bgPos: "center",
    bgImg: "url()",
  })

  expect(console).toHaveWarned()
})
