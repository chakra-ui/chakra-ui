"use client"

import { useCallback, useInsertionEffect, useRef } from "react"

/**
 * This hook is user-land implementation of the experimental `useEffectEvent` hook.
 * React docs: https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event
 */
export function useCallbackRef<Args extends unknown[], Return>(
  callback: ((...args: Args) => Return) | undefined,
  deps: React.DependencyList = [],
) {
  const callbackRef = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.")
  })

  // Use useInsertionEffect to update the ref before React processes effects
  useInsertionEffect(() => {
    callbackRef.current = callback
  })

  // We're removing the dependency array because we want this callback to be stable
  // across renders, and only the internal ref.current should change
  return useCallback((...args: Args) => callbackRef.current?.(...args), [])
}
