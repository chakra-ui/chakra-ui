import { convertToArray } from "./breakpoint.utils"

describe("convertToArray()", () => {
  const theme: any = {
    breakpoints: { sm: "2em", md: "5em", lg: "10em" },
  }

  it("should work for a single value", () => {
    expect(convertToArray(theme, 1.3)).toEqual([1.3])
    expect(convertToArray(theme, "34rem")).toEqual(["34rem"])
  })
  it("should work for an array", () => {
    expect(convertToArray(theme, [1.2, "3rem"])).toEqual([1.2, "3rem"])
    expect(convertToArray(theme, [null, "3rem"])).toEqual([null, "3rem"])
  })
  it("should work for an object", () => {
    expect(convertToArray(theme, { sm: 1 })).toEqual([1])
    expect(convertToArray(theme, { lg: 1 })).toEqual([null, null, 1])
    expect(convertToArray(theme, { sm: 1, md: 2 })).toEqual([1, 2])
    expect(convertToArray(theme, { sm: 1, lg: 2 })).toEqual([1, null, 2])
    expect(convertToArray(theme, { md: 1, lg: 2 })).toEqual([null, 1, 2])
  })
})
