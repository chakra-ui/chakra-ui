import * as React from "react"
import { isFunction, isString } from "./assertion"

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string
  /**
   * The display name of the context
   */
  name?: string
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>]

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = "useContext must be inside a Provider with a value",
    name,
  } = options

  const Context = React.createContext<ContextType | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = React.useContext(Context)
    if (!context && strict) throw new Error(errorMessage)
    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<
    ContextType
  >
}

/**
 * Creates a Provider and context hook from any react hook
 * @param hook
 */
export function createHookContext<HookProps, HookReturn>(
  hook: (props: HookProps) => HookReturn,
) {
  const [ContextProvider, useContext] = createContext<HookReturn>()

  const Provider: React.FC<HookProps> = props => {
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

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child),
  ) as React.ReactElement[]
}

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return

  if (isFunction(ref)) {
    ref(value)
    return
  }

  try {
    ;(ref as React.MutableRefObject<T>).current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
export function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => assignRef(ref, value))
  }
}

/**
 * Get the display name of a component.
 * It's really useful when debugging in Dev Tools.
 *
 * @param primitive the react element or component type
 */
export function getDisplayName(primitive: any) {
  return isString(primitive)
    ? primitive
    : primitive.displayName || primitive.name || "ChakraComponent"
}
