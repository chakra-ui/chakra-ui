import { createPreflight } from "../src/styled-system/preflight"

describe("preflight", () => {
  test("preserves semantic italic styles", () => {
    const result = createPreflight({ preflight: true })

    expect(result["i, em"]).toEqual({
      fontStyle: "italic",
    })
  })
})
