import memoizeOne from "memoize-one"
import { isFunction, __DEV__ } from "./assertion"
import { FunctionArguments } from "./types"

export function runIfFn<T, U>(
  valueOrFn: T | ((...args: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function (event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn && fn(event)
      return event && event.defaultPrevented
    })
  }
}

export { memoizeOne }

export function once(fn?: Function | null) {
  let result: any

  return function (this: any, ...args: any[]) {
    if (fn) {
      result = fn.apply(this, args)
      fn = null
    }

    return result
  }
}

export const noop = () => {}

type MessageOptions = {
  condition: boolean
  message: string
}

export const warn = once((options: MessageOptions) => {
  const { condition, message } = options
  if (condition && __DEV__) {
    console.warn(message)
  }
})

export const error = once((options: MessageOptions) => {
  const { condition, message } = options
  if (condition && __DEV__) {
    console.error(message)
  }
})
