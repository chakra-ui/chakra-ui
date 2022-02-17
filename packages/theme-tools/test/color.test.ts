import { getColor } from "../src"

test("gets color from theme", () => {
  expect(
    getColor({ colors: { red: { 200: "#ff0000" } } }, "red.200", "red.200"),
  ).toBe("#ff0000")
})

test("can get semantic token from theme", () => {
  expect(
    getColor(
      { semanticTokens: { colors: { error: { 200: "#ff0000" } } } },
      "error.200",
      "error.200",
    ),
  ).toBe("#ff0000")
})

test("takes color over semanticToken", () => {
  expect(
    getColor(
      {
        colors: { red: { 200: "#dd0000" } },
        semanticTokens: { colors: { red: { 200: "#ff0000" } } },
      },
      "red.200",
      "red.200",
    ),
  ).toBe("#dd0000")
})
