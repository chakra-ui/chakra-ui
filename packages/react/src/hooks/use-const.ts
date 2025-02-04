"use client"

import { useRef } from "react"

type InitFn<T> = () => T

export function useConst<T extends any>(init: T | InitFn<T>): T {
  const ref = useRef(null)
  if (ref.current === null) {
    // @ts-ignore
    ref.current = typeof init === "function" ? init() : init
  }
  return ref.current as T
}
