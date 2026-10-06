import type { AnyFunction } from "./types.ts"

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(...args: Parameters<T>) {
    fns.forEach((fn) => fn?.(...args))
  }
}
