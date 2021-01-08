import { parseGradient } from "../src/utils/parse-gradient"

const theme = {
  colors: {
    green: "#006400",
    red: "#800000",
    pink: {
      light: "#FFB6C1",
      dark: "#FF1493",
    },
  },
}

describe("linear gradient", () => {
  test("should convert simple value", () => {
    const input = "linear(to-t, red, green)"
    const output = parseGradient(input, theme)
    expect(output).toEqual("linear-gradient(to top, #800000, #006400)")
  })

  test("should convert value with HEX code", () => {
    const input = "linear(to-t, #fff, #bbb)"
    const output = parseGradient(input, theme)
    expect(output).toEqual("linear-gradient(to top, #fff, #bbb)")
  })

  test("should convert without direction", () => {
    const input = "linear(red,green)"
    const output = parseGradient(input, theme)
    expect(output).toEqual("linear-gradient(#800000, #006400)")
  })

  test("should convert with double space", () => {
    // Oops! user added double space after direction
    const input = "linear(to-tl,red,green)"
    const output = parseGradient(input, theme)
    // we clean up the extra space
    expect(output).toEqual("linear-gradient(to top left, #800000, #006400)")
  })

  test("should not parse if value is 'none'", () => {
    expect(parseGradient("none", theme)).toEqual("none")
  })

  test("should not parse null", () => {
    expect(parseGradient(null, theme)).toBeNull()
  })

  test("should parse nested colors", () => {
    expect(parseGradient("radial(to-b, pink.light, pink.dark)", theme)).toEqual(
      "radial-gradient(to bottom, #FFB6C1, #FF1493)",
    )
  })

  test("should parse nested colors and css value - 1", () => {
    expect(parseGradient("radial(to-b, pink, pink.dark)", theme)).toEqual(
      "radial-gradient(to bottom, pink, #FF1493)",
    )
  })

  test("should parse nested colors and css value - 2", () => {
    expect(parseGradient("radial(to-b, #bbb, pink.dark)", theme)).toEqual(
      "radial-gradient(to bottom, #bbb, #FF1493)",
    )
  })

  test("should parse color stop with percentage", () => {
    expect(
      parseGradient("radial(to-b, #bbb 15%, pink.dark 15%)", theme),
    ).toEqual("radial-gradient(to bottom, #bbb 15%, #FF1493 15%)")
  })

  test("should parse colors in rgb", () => {
    expect(
      parseGradient("linear(to-l, rgb(0,0,0), rgb(255,255,255))", theme),
    ).toEqual("linear-gradient(to left, rgb(0, 0, 0), rgb(255, 255, 255))")
  })

  test("should parse colors in rgb with percentage", () => {
    expect(
      parseGradient(
        "linear(to-l, rgb(0,0,0) 15%, rgb(255,255,255) 15%)",
        theme,
      ),
    ).toEqual(
      "linear-gradient(to left, rgb(0, 0, 0) 15%, rgb(255, 255, 255) 15%)",
    )
  })
})

describe("conic gradient", () => {
  test("basic value", () => {
    expect(parseGradient("conic(#fff, #000)", theme)).toEqual(
      "conic-gradient(#fff, #000)",
    )
  })

  test("replace color tokens", () => {
    expect(parseGradient("conic(pink.light, #ttt)", theme)).toEqual(
      "conic-gradient(#FFB6C1, #ttt)",
    )
  })

  test("replace color tokens - with from(...)", () => {
    expect(parseGradient("conic(from 90deg, #fff, #000)", theme)).toEqual(
      "conic-gradient(from 90deg, #fff, #000)",
    )
  })

  test("replace color tokens - with long values", () => {
    expect(
      parseGradient(
        "conic(pap, yellow, lime, aqua, blue, magenta, pap)",
        theme,
      ),
    ).toEqual("conic-gradient(pap, yellow, lime, aqua, blue, magenta, pap)")
  })
})
