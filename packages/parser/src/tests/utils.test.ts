import {
  filterUndefined,
  isSubcomponent,
  assignArrayValue,
  assignObjectValue,
  getMediaQuery,
  isNotEmpty,
  transformConfig,
  ConfigObject,
  positiveOrNegative,
  sort,
} from "../utils"
import theme from "./theme"

test("should filter undefined values in object", () => {
  const result = filterUndefined({ variant: undefined, colorScheme: "red" })
  expect(result).toMatchObject({ colorScheme: "red" })
})

test("should return `true` if key is for subcomponent", () => {
  const result = isSubcomponent("Tab.TabList")
  expect(result).toBeTruthy()
})

test("should assign array value", () => {
  const result = assignArrayValue({
    values: ["20px", "40px", "60px"],
    mediaQueries: [
      "@media(min-width: 320px)",
      "@media(min-width: 760px)",
      "@media(min-width: 960px)",
    ],
    prop: "margin",
    transform: val => val,
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media(min-width: 320px)": Object {
        "margin": "40px",
      },
      "@media(min-width: 760px)": Object {
        "margin": "60px",
      },
      "margin": "20px",
    }
  `)
})

test("should assign object value", () => {
  const result = assignObjectValue({
    values: { base: "20px", sm: "40px", md: "60px" },
    mediaQueries: {
      sm: "@media(min-width: 320px)",
      md: "@media(min-width: 768px)",
    },
    prop: "margin",
    transform: val => val,
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media(min-width: 320px)": Object {
        "margin": "40px",
      },
      "@media(min-width: 768px)": Object {
        "margin": "60px",
      },
      "margin": "20px",
    }
  `)
})

test("should convert media query to array & object", () => {
  const result = getMediaQuery({ sm: 420, md: 768, lg: 1200 })
  expect(result).toMatchInlineSnapshot(`
    Object {
      "asArray": Array [
        "@media screen and (min-width: 420px)",
        "@media screen and (min-width: 768px)",
        "@media screen and (min-width: 1200px)",
      ],
      "asObject": Object {
        "lg": "@media screen and (min-width: 1200px)",
        "md": "@media screen and (min-width: 768px)",
        "sm": "@media screen and (min-width: 420px)",
      },
    }
  `)
})

test("should check is object is not empty", () => {
  expect(isNotEmpty({})).toBeFalsy()
  expect(isNotEmpty({ size: "sm" })).toBeTruthy()
})

test("should transform configs", () => {
  const configs: ConfigObject = {
    boxShadow: true,
    paddingX: {
      properties: ["paddingLeft", "paddingRight"],
      scale: "space",
    },
  }
  const result = transformConfig(configs, theme)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "boxShadow": Object {
        "property": "boxShadow",
      },
      "paddingX": Array [
        Object {
          "property": "paddingLeft",
          "scale": Object {
            "lg": 24,
            "md": 12,
            "sm": 4,
            "xl": 40,
          },
        },
        Object {
          "property": "paddingRight",
          "scale": Object {
            "lg": 24,
            "md": 12,
            "sm": 4,
            "xl": 40,
          },
        },
      ],
    }
  `)
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

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media(min-width: 320px)": Object {
        "margin": "40px",
      },
      "@media(min-width: 768px)": Object {
        "margin": "60px",
      },
      "border": "2px solid",
      "borderLeft": "2px solid",
      "color": "pink",
      "margin": "20px",
    }
  `)
})
