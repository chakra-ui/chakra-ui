import { Dict, breakpoints, isArray, memoizeOne } from "@chakra-ui/utils"

function normalizeBreakpointObject(bps: Dict) {
  let result = [] as any
  result = Object.values(bps)
  for (const key in bps) {
    result[key] = bps[key]
  }
  return result
}

function normalizeBreakpointArray(bps: any[]) {
  const result = bps
  for (let index = 0; index < bps.length; index++) {
    result[breakpoints[index + 1]] = bps[index]
  }
  return result
}

const normalizeBreakpoints = memoizeOne((value: any) => {
  return isArray(value)
    ? normalizeBreakpointArray(value)
    : normalizeBreakpointObject(value)
})

test("should normalize array", () => {
  const result = normalizeBreakpoints(["34em", "56em", "65em"])
  expect(result.sm).toBe("34em")
  expect(result.md).toBe("56em")
  expect(result.lg).toBe("65em")
})

test("should normalize object", () => {
  const result = normalizeBreakpoints({ sm: "34em", md: "56em", lg: "65em" })
  expect(result[0]).toBe("34em")
  expect(result[1]).toBe("56em")
  expect(result[2]).toBe("65em")
})
