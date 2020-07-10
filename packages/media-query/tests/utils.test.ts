import { getClosestValue, arrayToObject } from "../src/media-query.utils"

test("should get the closest responsive value", () => {
  expect(getClosestValue({ base: "40px", md: "500px" }, "xl")).toBe("500px")
  expect(getClosestValue({ base: "40px", md: "500px" }, "sm")).toBe("40px")
  expect(getClosestValue({ base: "40px" }, "lg")).toBe("40px")
  expect(getClosestValue({ sm: "40px", md: "500px" }, "sm")).toBe("40px")
  expect(getClosestValue({ sm: "40px", md: "500px" }, "base")).toBe(undefined)
  expect(getClosestValue({}, "")).toBe(undefined)
})

test("should convert array to object value", () => {
  expect(arrayToObject(["20px", null, null, "60px"])).toEqual({
    base: "20px",
    lg: "60px",
  })
  expect(arrayToObject(["30px"])).toEqual({ base: "30px" })
  expect(arrayToObject(["30px", "50px"])).toEqual({ base: "30px", sm: "50px" })
  expect(arrayToObject([])).toEqual({})
})
