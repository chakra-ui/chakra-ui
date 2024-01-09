import { AnyFunction } from "./types"

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(...args: Parameters<T>) {
    fns.forEach((fn) => fn?.(...args))
  }
}

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: Parameters<T>[0]) {
    fns.some((fn) => {
      fn?.(event)
      return event?.defaultPrevented
    })
  }
}
