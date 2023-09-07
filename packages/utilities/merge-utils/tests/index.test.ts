import { mergeWith } from "../src"

describe("merge utils", () => {
  test("should work", () => {
    const result = mergeWith(
      { parts: ["a"], baseStyle: () => ({ bg: "red.200" }) },
      { parts: ["b"], baseStyle: () => ({ color: "pink", bg: "red.500" }) },
    )
    expect(result.baseStyle({})).toMatchInlineSnapshot(`
{
  "bg": "red.500",
  "color": "pink",
}
`)
    expect(result.parts).toMatchInlineSnapshot(`
[
  "a",
  "b",
]
`)
  })
})
