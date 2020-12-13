import { css } from "../src"

test("should transform logical css properties", () => {
  const result = css({ mtBidi: "sm" })({
    space: {
      sm: 40,
    },
  })
  expect(result).toHaveProperty("marginBlockStart")
  expect(result.marginBlockStart).toEqual(40)
})
