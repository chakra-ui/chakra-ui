const breakpoints = ["base", "sm", "md", "lg", "xl"]

function getClosestValue(value: any, bp: string) {
  let index = Object.keys(value).indexOf(bp)

  if (index !== -1) return value[bp]

  let stop = breakpoints.indexOf(bp)
  let found = false

  while (stop >= 0 && !found) {
    const bpKey = breakpoints[stop]
    if (value[bpKey] != null) {
      index = stop
      found = true
    }
    stop--
  }

  if (index !== -1) {
    const bpKey = breakpoints[index]
    return value[bpKey]
  }

  return undefined
}

test("should get the closest responsive value", () => {
  expect(getClosestValue({ base: "40px", md: "500px" }, "xl")).toBe("500px")
  expect(getClosestValue({ base: "40px", md: "500px" }, "sm")).toBe("40px")
  expect(getClosestValue({ base: "40px" }, "lg")).toBe("40px")
  expect(getClosestValue({ sm: "40px", md: "500px" }, "sm")).toBe("40px")
  expect(getClosestValue({ sm: "40px", md: "500px" }, "base")).toBe(undefined)
  expect(getClosestValue({}, "")).toBe(undefined)
})
