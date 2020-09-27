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
  const sorted = Object.entries({ base: "0em", ...config })
    .sort((a, b) => (parseInt(a[1]) > parseInt(b[1]) ? 1 : -1))
    .reduce((carry, [key, value]) => {
      carry[key] = value
      return carry
    }, {}) as WithBase<T>

  return Object.assign(Object.values(sorted), sorted)
}
