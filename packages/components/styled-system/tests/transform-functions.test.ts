import { transformFunctions as t } from "../src/utils/transform-functions"

test("should transform background image", () => {
  expect(t.bgImage("/testing.png")).toBe("url(/testing.png)")

  const linear = "linear-gradient(green, gren)"
  expect(t.bgImage(linear)).toBe(linear)

  expect(t.bgImage(undefined)).toBe(undefined)
  expect(t.bgImage("unset")).toBe("unset")
  expect(t.bgImage(null)).toBe(null)
})
