import { useEffect, useLayoutEffect } from "react"

export const useSafeLayoutEffect = Boolean(globalThis?.document)
  ? useLayoutEffect
  : useEffect
