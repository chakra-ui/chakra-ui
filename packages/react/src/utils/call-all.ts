import type { AnyFunction } from "./types"

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(...args: Parameters<T>) {
    fns.forEach((fn) => fn?.(...args))
  }
}
