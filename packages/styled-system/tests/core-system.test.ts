import { system } from "../src"

test("returns a style parser", () => {
  const parser = system({
    color: true,
    backgroundColor: {
      property: "backgroundColor",
      scale: "colors",
    },
    mx: {
      scale: "space",
      properties: ["marginLeft", "marginRight"],
    },
  })

  expect(typeof parser).toBe("function")
  const styles = parser({
    theme: {
      space: [0, 4, 8, 16, 32],
      colors: {
        primary: "rebeccapurple",
      },
    },
    color: "tomato",
    backgroundColor: "primary",
    mx: [2, 3, 4],
  })
  expect(styles).toEqual({
    color: "tomato",
    backgroundColor: "rebeccapurple",
    marginLeft: 8,
    marginRight: 8,
    "@media screen and (min-width: 40em)": {
      marginLeft: 16,
      marginRight: 16,
    },
    "@media screen and (min-width: 52em)": {
      marginLeft: 32,
      marginRight: 32,
    },
  })
})

test("merges multiple responsive styles", () => {
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  })
  const styles = parser({
    margin: [0, 4, 8],
    padding: [16, 32, 64],
    width: ["100%", "50%"],
  })
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    width: "100%",
    "@media screen and (min-width: 40em)": {
      margin: 4,
      padding: 32,
      width: "50%",
    },
    "@media screen and (min-width: 52em)": {
      margin: 8,
      padding: 64,
    },
  })
})

test("merges multiple responsive object styles", () => {
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  })
  const styles = parser({
    margin: { _: 0, 0: 4, 1: 8 },
    padding: { _: 16, 0: 32, 1: 64 },
    width: { _: "100%", 0: "50%" },
  })
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    width: "100%",
    "@media screen and (min-width: 40em)": {
      margin: 4,
      padding: 32,
      width: "50%",
    },
    "@media screen and (min-width: 52em)": {
      margin: 8,
      padding: 64,
    },
  })
})

test("gets values from theme", () => {
  const parser = system({
    mx: {
      properties: ["marginLeft", "marginRight"],
      scale: "space",
    },
    color: {
      property: "color",
      scale: "colors",
    },
  })
  const style = parser({
    theme: {
      colors: {
        primary: "tomato",
      },
      space: [0, 6, 12, 24, 48, 96],
    },
    mx: [0, 1, 2, 3],
    color: ["primary", "black"],
  })
  expect(style).toEqual({
    color: "tomato",
    marginLeft: 0,
    marginRight: 0,
    "@media screen and (min-width: 40em)": {
      color: "black",
      marginLeft: 6,
      marginRight: 6,
    },
    "@media screen and (min-width: 52em)": {
      marginLeft: 12,
      marginRight: 12,
    },
    "@media screen and (min-width: 64em)": {
      marginLeft: 24,
      marginRight: 24,
    },
  })
})

test("gets 0 index values from theme", () => {
  const parser = system({
    width: {
      property: "width",
      scale: "sizes",
    },
  })
  const style = parser({
    theme: {
      sizes: [24, 48],
    },
    width: 0,
  })
  expect(style).toEqual({ width: 24 })
})

test("ignores null values", () => {
  const parser = system({
    color: true,
  })
  const style = parser({ color: null })
  expect(style).toEqual({})
})

test("returns a noop function with no arguments", () => {
  const parser = system({})
  expect(typeof parser).toBe("function")
})

test("skips null values in arrays", () => {
  const parser = system({
    fontSize: true,
  })
  const style = parser({
    fontSize: [16, null, null, 18],
  })
  expect(style).toEqual({
    fontSize: 16,
    // omitting these keys cause issues when using multiple
    "@media screen and (min-width: 40em)": {},
    "@media screen and (min-width: 52em)": {},
    "@media screen and (min-width: 64em)": {
      fontSize: 18,
    },
  })
})

test("includes single property functions", () => {
  const parser = system({
    color: true,
    backgroundColor: true,
    width: true,
  })
  const a = parser.color({ color: "tomato", backgroundColor: "nope" })
  const b = parser.width({
    width: "100%",
    color: "tomato",
    backgroundColor: "nope",
  })
  expect(a).toEqual({ color: "tomato" })
  expect(b).toEqual({ width: "100%" })
})

test("parser configs can be composed manually", () => {
  const color = system({ color: true, backgroundColor: true })
  const layout = system({ width: true, height: true })
  const config = { ...color.config, ...layout.config }
  const composed = system(config)
  const style = composed({
    color: "tomato",
    backgroundColor: "black",
    width: "100%",
  })
  expect(style).toEqual({
    color: "tomato",
    backgroundColor: "black",
    width: "100%",
  })
})

test("supports non-array breakpoints object", () => {
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  })
  const styles = parser({
    theme: {
      config: {
        disableStyledSystemCache: true,
      },
      breakpoints: {
        sm: "32em",
        md: "40em",
        lg: "64em",
      },
    },
    margin: { _: 0, sm: 4, md: 8 },
    padding: { _: 16, lg: 64 },
  })
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    "@media screen and (min-width: 32em)": {
      margin: 4,
    },
    "@media screen and (min-width: 40em)": {
      margin: 8,
    },
    "@media screen and (min-width: 64em)": {
      padding: 64,
    },
  })
})

test("sorts media queries when responsive object values are used", () => {
  const parser = system({
    margin: true,
    padding: true,
    color: true,
  })
  const styles = parser({
    theme: {
      config: {
        disableStyledSystemCache: true,
      },
      breakpoints: {
        sm: "32em",
        md: "40em",
        lg: "64em",
        xl: "128em",
      },
    },
    padding: { _: 16, lg: 64, xl: 128 },
    margin: { sm: 4, md: 8 },
    color: { lg: "tomato" },
  })
  expect(Object.keys(styles)).toEqual([
    "@media screen and (min-width: 32em)",
    "@media screen and (min-width: 40em)",
    "@media screen and (min-width: 64em)",
    "@media screen and (min-width: 128em)",
    "padding",
  ])
})

test("transforms values", () => {
  const parser = system({
    margin: {
      property: "margin",
      transform: (n, scale, props) => {
        const m = props.multiply || 1
        return m * n
      },
    },
  })
  const a = parser({ margin: 8 })
  const b = parser({ margin: 12, multiply: 2 })
  expect(a).toEqual({ margin: 8 })
  expect(b).toEqual({ margin: 24 })
})
