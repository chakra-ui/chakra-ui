import { fromEntries } from "@chakra-ui/utils"

export interface BaseBreakpointConfig extends Record<string, string> {
  sm: string
  md: string
  lg: string
  xl: string
}

export type Breakpoints<T = BaseBreakpointConfig> = string[] & WithBase<T>
export type WithBase<T> = T & { base: "0em" }

export const createBreakpoints = <T extends BaseBreakpointConfig>(
  config: T,
): Breakpoints<T> => {
  const sorted = fromEntries<WithBase<T>>(
    Object.entries({ base: "0em", ...config }).sort((a, b) =>
      parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1,
    ),
  )

  const result = Object.assign(Object.values(sorted), sorted)

  Object.defineProperty(result, "processed", {
    value: true,
    enumerable: false,
  })

  Object.defineProperty(result, "values", {
    value: config,
    enumerable: false,
  })

  return result
}
