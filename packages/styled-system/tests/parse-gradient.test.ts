import { toCSSVar } from "../src"
import { parseGradient } from "../src/utils/parse-gradient"

const theme = toCSSVar({
  colors: {
    green: "#006400",
    red: "#800000",
    pink: {
      light: "#FFB6C1",
      dark: "#FF1493",
    },
  },
})

describe("linear gradient", () => {
  test("should convert simple value", () => {
    const input = "linear(to-t, red, green)"
    const output = parseGradient(input, theme)
    expect(output).toMatchInlineSnapshot(
      `"linear-gradient(to top, var(--colors-red), var(--colors-green))"`,
    )
  })

  test("should convert value with HEX code", () => {
    const input = "linear(to-t, #fff, #bbb)"
    const output = parseGradient(input, theme)
    expect(output).toMatchInlineSnapshot(
      `"linear-gradient(to top, #fff, #bbb)"`,
    )
  })

  test("should convert without direction", () => {
    const input = "linear(red,green)"
    const output = parseGradient(input, theme)
    expect(output).toMatchInlineSnapshot(
      `"linear-gradient(var(--colors-red), var(--colors-green))"`,
    )
  })

  test("should convert with double space", () => {
    // Oops! user added double space after direction
    const input = "linear(to-tl,red,green)"
    const output = parseGradient(input, theme)
    // we clean up the extra space
    expect(output).toMatchInlineSnapshot(
      `"linear-gradient(to top left, var(--colors-red), var(--colors-green))"`,
    )
  })

  test("should not parse if value is none", () => {
    expect(parseGradient("none", theme)).toMatchInlineSnapshot(`"none"`)
  })

  test("should not parse null", () => {
    expect(parseGradient(null, theme)).toBeNull()
  })

  test("should parse nested colors", () => {
    expect(
      parseGradient("radial(to-b, pink.light, pink.dark)", theme),
    ).toMatchInlineSnapshot(
      `"radial-gradient(to bottom, var(--colors-pink-light), var(--colors-pink-dark))"`,
    )
  })

  test("should parse nested colors and css value - 1", () => {
    expect(
      parseGradient("radial(to-b, pink, pink.dark)", theme),
    ).toMatchInlineSnapshot(
      `"radial-gradient(to bottom, pink, var(--colors-pink-dark))"`,
    )
  })

  test("should parse nested colors and css value - 2", () => {
    expect(
      parseGradient("radial(to-b, #bbb, pink.dark)", theme),
    ).toMatchInlineSnapshot(
      `"radial-gradient(to bottom, #bbb, var(--colors-pink-dark))"`,
    )
  })

  test("should parse color stop with percentage", () => {
    expect(
      parseGradient("radial(to-b, #bbb 15%, pink.dark 15%)", theme),
    ).toMatchInlineSnapshot(
      `"radial-gradient(to bottom, #bbb 15%, var(--colors-pink-dark) 15%)"`,
    )
  })

  test("should parse color stop with function", () => {
    expect(
      parseGradient("linear(to-r, green, pink.dark calc(20px + 20px))", theme),
    ).toMatchInlineSnapshot(
      `"linear-gradient(to right, var(--colors-green), var(--colors-pink-dark) calc(20px + 20px))"`,
    )
  })

  test("should parse colors in rgb", () => {
    expect(
      parseGradient("linear(to-l, rgb(0,0,0), rgb(255,255,255))", theme),
    ).toMatchInlineSnapshot(
      `"linear-gradient(to left, rgb(0, 0, 0), rgb(255, 255, 255))"`,
    )
  })

  test("should parse colors in rgb with percentage", () => {
    expect(
      parseGradient(
        "linear(to-l, rgb(0,0,0) 15%, rgb(255,255,255) 15%)",
        theme,
      ),
    ).toMatchInlineSnapshot(
      `"linear-gradient(to left, rgb(0, 0, 0) 15%, rgb(255, 255, 255) 15%)"`,
    )
  })
})

describe("radial gradient", () => {
  test("should parse gradient with a named position", () => {
    expect(
      parseGradient("radial(circle at center, #fff, #000)", theme),
    ).toMatchInlineSnapshot(`"radial-gradient(circle at center, #fff, #000)"`)
  })
  test("should parse gradient with a position", () => {
    expect(
      parseGradient("radial(farthest-corner at 50% 50%, #fff, #000)", theme),
    ).toMatchInlineSnapshot(
      `"radial-gradient(farthest-corner at 50% 50%, #fff, #000)"`,
    )
  })
})

describe("conic gradient", () => {
  test("basic value", () => {
    expect(parseGradient("conic(#fff, #000)", theme)).toMatchInlineSnapshot(
      `"conic-gradient(#fff, #000)"`,
    )
  })

  test("replace color tokens", () => {
    expect(
      parseGradient("conic(pink.light, #ttt)", theme),
    ).toMatchInlineSnapshot(`"conic-gradient(var(--colors-pink-light), #ttt)"`)
  })

  test("replace color tokens - with from(...)", () => {
    expect(
      parseGradient("conic(from 90deg, #fff, #000)", theme),
    ).toMatchInlineSnapshot(`"conic-gradient(from 90deg, #fff, #000)"`)
  })

  test("replace color tokens - with long values", () => {
    expect(
      parseGradient(
        "conic(pap, yellow, lime, aqua, blue, magenta, pap)",
        theme,
      ),
    ).toMatchInlineSnapshot(
      `"conic-gradient(pap, yellow, lime, aqua, blue, magenta, pap)"`,
    )
  })
})
