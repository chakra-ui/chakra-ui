import * as React from "react"
import { isFunction, isString } from "./assertion"

export interface CreateContextOptions {
  /** If `true`, will throw an error if context is null or undefined */
  strict?: boolean
  /** Error message to throw if the context is undefined */
  errorMessage?: string
  /** The display name of the context */
  name?: string
}

export function createContext<T>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = "useContext must be inside a Provider with a value",
    name,
  } = options

  const Context = React.createContext<T | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = React.useContext(Context)
    if (!context && strict) throw new Error(errorMessage)
    return context
  }

  return [Context.Provider, useContext, Context] as [
    React.Provider<T>,
    () => T,
    React.Context<T>,
  ]
}

export function createHookContext<P, R>(hook: (props: P) => R) {
  const [ContextProvider, useContext] = createContext<R>()
  const Provider: React.FC<P> = props => {
    const context = hook(props)
    const memoContext = React.useMemo(() => context, [context])

    return React.createElement(ContextProvider, {
      value: memoContext,
      children: props.children,
    })
  }
  const useProviderContext = () => useContext()
  return [Provider, useProviderContext] as const
}

export function cleanChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child),
  ) as React.ReactElement[]
}

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return

  if (isFunction(ref)) {
    ref(value)
    return
  }

  try {
    ;(ref as React.MutableRefObject<T>).current = value
  } catch (error) {
    throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
  }
}

export function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => assignRef(ref, value))
  }
}

export function getDisplayName(primitive: any) {
  return isString(primitive)
    ? primitive
    : primitive.displayName || primitive.name || "ChakraComponent"
}
