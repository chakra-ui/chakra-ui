export type AnyFunction<T = any> = (...args: T[]) => any

export type Merge<M, N> = N extends Record<string, unknown>
  ? M
  : Omit<M, keyof N> & N

export interface FocusableElement {
  focus(options?: FocusOptions): void
}

export type Dict<T = any> = Record<string, T>
