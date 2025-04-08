"use client"

import { useEffect, useLayoutEffect } from "react"

export const useSafeLayoutEffect =
  typeof globalThis?.document !== "undefined" ? useLayoutEffect : useEffect
