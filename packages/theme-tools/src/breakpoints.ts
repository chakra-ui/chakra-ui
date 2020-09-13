export interface BaseBreakpointConfig extends Record<string, string> {
  sm: string
  md: string
  lg: string
  xl: string
}

export type Breakpoints<T = BaseBreakpointConfig> = string[] & T

export const createBreakpoints = <T extends BaseBreakpointConfig>(
  config: T,
): Breakpoints<T> => {
  const sorted = Object.fromEntries(
    Object.entries(config).sort((a, b) =>
      parseInt(a[1]) > parseInt(b[1]) ? 1 : -1,
    ),
  ) as T

  return Object.assign(Object.values(sorted), sorted)
}
