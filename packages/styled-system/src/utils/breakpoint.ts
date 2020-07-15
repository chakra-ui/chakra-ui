import { Dict, breakpoints, isArray } from "@chakra-ui/utils"

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

export function normalizeBreakpoints(value: any) {
  return isArray(value)
    ? normalizeBreakpointArray(value)
    : normalizeBreakpointObject(value)
}
