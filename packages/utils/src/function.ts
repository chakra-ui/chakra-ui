/* eslint-disable no-nested-ternary */
import { isFunction, isNumber, __DEV__, __TEST__ } from "./assertion"
import { AnyFunction, FunctionArguments } from "./types"

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

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: FunctionArguments<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg)
    })
  }
}

export const compose = <T>(
  fn1: (...args: T[]) => T,
  ...fns: Array<(...args: T[]) => T>
) => fns.reduce((f1, f2) => (...args) => f1(f2(...args)), fn1)

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

export const noop = () => {}

type MessageOptions = {
  condition: boolean
  message: string
}

export const warn = once((options: MessageOptions) => () => {
  const { condition, message } = options
  if (condition && __DEV__) {
    console.warn(message)
  }
})

export const error = once((options: MessageOptions) => () => {
  const { condition, message } = options
  if (condition && __DEV__) {
    console.error(message)
  }
})

const promiseMicrotask = (callback: VoidFunction) => {
  Promise.resolve().then(callback)
}

export const scheduleMicrotask = __TEST__
  ? (fn: VoidFunction) => fn()
  : typeof queueMicrotask === "function"
  ? queueMicrotask
  : promiseMicrotask

const combineFunctions = (a: Function, b: Function) => (v: any) => b(a(v))
export const pipe = (...transformers: Function[]) =>
  transformers.reduce(combineFunctions)

const distance1D = (a: number, b: number) => Math.abs(a - b)
type Point = { x: number; y: number }

const isPoint = (point: any): point is { x: number; y: number } =>
  "x" in point && "y" in point

export function distance<P extends Point | number>(a: P, b: P) {
  if (isNumber(a) && isNumber(b)) {
    return distance1D(a, b)
  }
  if (isPoint(a) && isPoint(b)) {
    const xDelta = distance1D(a.x, b.x)
    const yDelta = distance1D(a.y, b.y)
    return Math.sqrt(xDelta ** 2 + yDelta ** 2)
  }
  return 0
}
