"use client"

import { useMemo } from "react"
import { useChakraContext } from "./provider"

export function useToken(category: string, token: string | string[]): string[] {
  const sys = useChakraContext()
  return useMemo(() => {
    const arr = Array.isArray(token) ? token : [token]
    return arr.map((t) => sys.token(`${category}.${t}`, t))
  }, [sys, category, token])
}
