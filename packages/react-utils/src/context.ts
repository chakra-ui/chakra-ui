import * as React from "react"

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
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name,
  } = options

  const Context = React.createContext<ContextType | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = React.useContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage)
      error.name = "ContextError"
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>
}
