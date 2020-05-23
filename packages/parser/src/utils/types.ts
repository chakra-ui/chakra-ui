export type ResponsiveValue<T> =
  | T
  | Array<T | null>
  | { [breakpoint: string]: T }

export type Length = string | 0 | number
