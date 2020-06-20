import {
  assignArray,
  assignObject,
  Config,
  getMediaQuery,
  positiveOrNegative,
  sort,
  transformConfig,
} from "../src"
import theme from "./theme"

test("should assign array value", () => {
  const result = assignArray({
    values: ["20px", "40px", "60px"],
    mediaQueries: [
      "@media(min-width: 320px)",
      "@media(min-width: 760px)",
      "@media(min-width: 960px)",
    ],
    prop: "margin",
    transform: (val) => val,
  })

  expect(result).toEqual({
    margin: "20px",
    "@media(min-width: 320px)": {
      margin: "40px",
    },
    "@media(min-width: 760px)": {
      margin: "60px",
    },
  })
})

test("should assign object value", () => {
  const result = assignObject({
    values: { base: "20px", sm: "40px", md: "60px" },
    mediaQueries: {
      sm: "@media(min-width: 320px)",
      md: "@media(min-width: 768px)",
    },
    prop: "margin",
    transform: (val) => val,
  })

  expect(result).toEqual({
    margin: "20px",
    "@media(min-width: 320px)": {
      margin: "40px",
    },
    "@media(min-width: 768px)": {
      margin: "60px",
    },
  })
})

test("should convert media query to array & object", () => {
  const result = getMediaQuery({ sm: 420, md: 768, lg: 1200 })
  expect(result).toEqual({
    asArray: [
      "@media screen and (min-width: 420px)",
      "@media screen and (min-width: 768px)",
      "@media screen and (min-width: 1200px)",
    ],
    asObject: {
      sm: "@media screen and (min-width: 420px)",
      md: "@media screen and (min-width: 768px)",
      lg: "@media screen and (min-width: 1200px)",
    },
  })
})

test("should transform style configs", () => {
  const config: Config = {
    boxShadow: true,
    paddingX: {
      properties: ["paddingLeft", "paddingRight"],
      scale: "space",
    },
  }
  const result = transformConfig(config, theme)
  expect(result).toEqual({
    boxShadow: { property: "boxShadow" },
    paddingX: [
      {
        property: "paddingLeft",
        scale: { lg: 24, md: 12, sm: 4, xl: 40 },
      },
      {
        property: "paddingRight",
        scale: { lg: 24, md: 12, sm: 4, xl: 40 },
      },
    ],
  })
})

test("should resolve positive or negative values", () => {
  const r1 = positiveOrNegative("-sm", theme.space)
  expect(r1).toEqual(-4)

  const r2 = positiveOrNegative("auto", theme.space)
  expect(r2).toEqual("auto")

  const r3 = positiveOrNegative("40em", theme.space)
  expect(r3).toEqual("40em")

  const r4 = positiveOrNegative("md", theme.space)
  expect(r4).toEqual(12)

  const r5 = positiveOrNegative("-40em", theme.space)
  expect(r5).toEqual("-40em")

  const r6 = positiveOrNegative(-1, { "1": "0.25rem" })
  expect(r6).toEqual("-0.25rem")
})

test("should sort styles", () => {
  const result = sort({
    margin: "20px",
    "@media(min-width: 768px)": {
      margin: "60px",
    },
    "@media(min-width: 320px)": {
      margin: "40px",
    },
    color: "pink",
    borderLeft: "2px solid",
    border: "2px solid",
  })

  expect(result).toEqual({
    "@media(min-width: 320px)": {
      margin: "40px",
    },
    "@media(min-width: 768px)": {
      margin: "60px",
    },
    border: "2px solid",
    borderLeft: "2px solid",
    color: "pink",
    margin: "20px",
  })
})
