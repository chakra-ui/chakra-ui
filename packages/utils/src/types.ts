export type AnyFunction<T = any> = (...args: T[]) => any

export type Merge<M, N> = N extends Record<string, unknown>
  ? M
  : Omit<M, keyof N> & N

export interface FocusableElement {
  focus(options?: FocusOptions): void
}

export type Dict<T = any> = Record<string, T>

export type LiteralUnion<T> = T | (string & {})

export type Pretty<T> = { [K in keyof T]: T[K] } & {}

export type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : never

export type DistributiveUnion<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] | T[K] : T[K]
} & DistributiveOmit<U, keyof T>

export type Assign<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K]
} & U
