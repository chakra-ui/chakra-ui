import { warn } from "@chakra-ui/utils"

export interface BaseBreakpointConfig {
  sm: string
  md: string
  lg: string
  xl: string
  "2xl"?: string
  [key: string]: string | undefined
}

export type Breakpoints<T> = T & { base: "0em" }

export const createBreakpoints = <T extends BaseBreakpointConfig>(
  config: T,
): Breakpoints<T> => {
  warn({
    condition: true,
    message: [
      `[chakra-ui]: createBreakpoints(...) will be deprecated pretty soon`,
      `simply pass the breakpoints as an object. Remove the createBreakpoint(..) call`,
    ].join(""),
  })
  return { base: "0em", ...config }
}
