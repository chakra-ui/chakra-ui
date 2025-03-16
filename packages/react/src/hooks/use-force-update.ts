"use client"

import { useReducer } from "react"

export function useForceUpdate() {
  return useReducer((x) => x + 1, 0)[1]
}
