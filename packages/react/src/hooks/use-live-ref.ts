"use client"

import { useRef } from "react"

export function useLiveRef<T>(value: T) {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}
