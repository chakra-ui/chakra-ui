"use client"

import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react"

export interface CreateContextOptions<T> {
  strict?: boolean | undefined
  hookName?: string | undefined
  providerName?: string | undefined
  errorMessage?: string | undefined
  name?: string | undefined
  defaultValue?: T | undefined
}

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`
}

type CreateContextReturn<T, HasValue extends boolean> = [
  React.Provider<T>,
  HasValue extends true ? () => T : () => T | undefined,
  HasValue extends true ? React.Context<T> : React.Context<T | undefined>,
]

export function createContext<T>(
  options?: CreateContextOptions<T> & { strict?: true },
): CreateContextReturn<T, true>

export function createContext<T>(
  options: CreateContextOptions<T> & { strict: false; defaultValue: T },
): CreateContextReturn<T, true>

export function createContext<T>(
  options: CreateContextOptions<T> & { strict: false },
): CreateContextReturn<T, false>

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options

  const Context = createReactContext<T | undefined>(defaultValue)

  Context.displayName = name

  function useContext() {
    const context = useReactContext(Context)

    if (!context && strict) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName),
      )
      error.name = "ContextError"
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [Context.Provider, useContext, Context] as any
}
