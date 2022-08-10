import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react"

export interface CreateContextOptions {
  strict?: boolean
  hookName?: string
  providerName?: string
  name?: string
}

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T,
  React.Context<T>,
]

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within the ${provider}`
}

export function createContext<T>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    name,
  } = options

  const Context = createReactContext<T | undefined>(undefined)

  Context.displayName = name

  function useContext() {
    const context = useReactContext(Context)

    if (!context && strict) {
      const error = new Error(getErrorMessage(hookName, providerName))
      error.name = "ContextError"
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>
}
