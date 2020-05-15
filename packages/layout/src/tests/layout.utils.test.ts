import { fillResponsiveArray, calculateBaselineCrop } from "../layout.utils"
import baseTheme from "@chakra-ui/preset-base"

describe("fillResponsiveArray()", () => {
  const cases = [
    [[], []],
    [["a"], ["a"]],
    [
      ["a", null],
      ["a", "a"],
    ],
    [
      ["a", null, "b"],
      ["a", "a", "b"],
    ],
    [
      [null, "a", null, "b"],
      [null, "a", "a", "b"],
    ],
    [
      ["a", null, "b", null],
      ["a", "a", "b", "b"],
    ],
  ]

  cases.forEach(([input, output], index) => {
    it(`should work for case ${index}`, () => {
      const result = fillResponsiveArray(input, input.length)
      expect(result).toEqual(output)
    })
  })

  it("should work for longer length", () => {
    const result = fillResponsiveArray(["a", null, "b"], 5)
    expect(result).toEqual(["a", "a", "b", "b", "b"])
  })

  it("should work for empty array", () => {
    const result = fillResponsiveArray([], 3)
    expect(result).toEqual([null, null, null])
  })
})

describe("calculateTextCrop()", () => {
  const theme = {
    ...baseTheme,
    baselineCrop: {
      body: {
        topCrop: 11,
        bottomCrop: 9,
      },
      mono: {
        topCrop: 8.5,
        bottomCrop: 10,
      },
    },
  }

  const cases: Parameters<typeof calculateBaselineCrop>[1][] = [
    {},
    { fontFamily: "mono" },
    { fontFamily: ["body", "mono"] },
    { lineHeight: "normal" },
    { lineHeight: 1.4 },
    { lineHeight: "tall" },
    { lineHeight: ["normal", "tall"] },
    { lineHeight: [null, "tall"] },
    { lineHeight: ["tall", null, "taller", null] },
    { lineHeight: ["tall", 1.5, "taller", null] },
    { lineHeight: ["short", "taller"], fontFamily: ["mono", "body"] },
    {
      lineHeight: ["short", null, "taller"],
      fontFamily: ["mono", "body", null],
    },
  ]

  cases.forEach((props, index) => {
    it(`should work for case #${index + 1}`, () => {
      const result = calculateBaselineCrop(theme, props)
      expect(result).toMatchSnapshot()
    })
  })

  it("array and object styles should produce the same result", () => {
    expect(calculateBaselineCrop(theme, { lineHeight: [1, 2] })).toEqual(
      calculateBaselineCrop(theme, { lineHeight: { sm: 1, md: 2 } }),
    )

    expect(
      calculateBaselineCrop(theme, {
        lineHeight: [1, 2],
        fontFamily: ["mono"],
      }),
    ).toEqual(
      calculateBaselineCrop(theme, {
        lineHeight: { sm: 1, md: 2 },
        fontFamily: { sm: "mono" },
      }),
    )
  })
})
