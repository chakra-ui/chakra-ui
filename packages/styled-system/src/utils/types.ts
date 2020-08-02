export type ResponsiveArray<T> = Array<T | null>

export type ResponsiveObject<T> = { [breakpoint: string]: T }

export type ResponsiveValue<T> = T | ResponsiveArray<T> | ResponsiveObject<T>

export type Length = string | 0 | number
