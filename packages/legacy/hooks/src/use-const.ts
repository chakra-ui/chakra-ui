import { useRef } from "react"

type InitFn<T> = () => T

/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConst`
 * you can ensure that initializers don't execute twice or more.
 */
export function useConst<T extends any>(init: T | InitFn<T>): T {
  // Use useRef to store the value because it's the least expensive built-in
  // hook that works here. We could also use `useState` but that's more
  // expensive internally due to reducer handling which we don't need.
  const ref = useRef<T | null>(null)

  if (ref.current === null) {
    ref.current = typeof init === "function" ? (init as InitFn<T>)() : init
  }

  return ref.current as T
}
