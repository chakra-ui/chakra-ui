import { css } from "../src"

test("should handle array interpolations", () => {
  //@ts-ignore
  const result = css({ "&": [{ bg: "red" }, { bg: "green" }] })({})
  expect(result).toEqual({
    "&": { background: "red" },
    "@media screen and (min-width: 40em)": { "&": { background: "green" } },
  })
})
