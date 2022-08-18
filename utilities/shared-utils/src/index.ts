import { AnyFunction, FunctionArguments } from "./types"

export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")
export const __DEV__ = process.env.NODE_ENV !== "production"

export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  )
}

export function once<T extends AnyFunction>(fn?: T | null) {
  let result: any

  return function func(this: any, ...args: Parameters<T>) {
    if (fn) {
      result = fn.apply(this, args)
      fn = null
    }

    return result
  }
}

type MessageOptions = {
  condition: boolean
  message: string
}

export const warn = /* @__PURE__ */ once((options: MessageOptions) => () => {
  const { condition, message } = options
  if (condition && __DEV__) {
    console.warn(message)
  }
})

export const error = /* @__PURE__ */ once((options: MessageOptions) => () => {
  const { condition, message } = options
  if (condition && __DEV__) {
    console.error(message)
  }
})

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event)
      return event?.defaultPrevented
    })
  }
}

export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === "function"
}
