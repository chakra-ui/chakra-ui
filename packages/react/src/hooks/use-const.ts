"use client"

import { useRef } from "react"

type InitFn<T> = () => T

export function useConst<T>(init: T | InitFn<T>): T {
  const ref = useRef<T | null>(null)
  if (ref.current === null) {
    ref.current = (
      typeof init === "function" ? (init as InitFn<T>)() : init
    ) as T
  }
  return ref.current
}
