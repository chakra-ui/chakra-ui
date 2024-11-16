"use client"

import { useEffect, useState } from "react"
import { Show } from "../show"

export interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ClientOnly = (props: ClientOnlyProps) => {
  const { children, fallback } = props
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <Show when={hasMounted} fallback={fallback}>
      {children}
    </Show>
  )
}
