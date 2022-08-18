export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

function isDev() {
  return process.env.NODE_ENV !== "production"
}

export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  )
}

type MessageOptions = {
  condition: boolean
  message: string
}

export const warn = (options: MessageOptions) => {
  const { condition, message } = options
  if (condition && isDev()) {
    console.warn(message)
  }
}

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

type FunctionArguments<T extends Function> = T extends (...args: infer R) => any
  ? R
  : never

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

const isFunction = <T extends Function = Function>(value: any): value is T =>
  typeof value === "function"

type Booleanish = boolean | "true" | "false"
export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "" : undefined) as Booleanish

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined
