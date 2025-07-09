"use client"

import { useEffect, useState } from "react"
import { Show } from "../show"

export interface ClientOnlyProps {
  /**
   * The content to render on the client side.
   *
   * **Note:** Use the function pattern when accessing browser-only APIs.
   */
  children: React.ReactNode | (() => React.ReactNode)
  /**
   * The fallback content to render while the component is mounting on the client
   * side.
   */
  fallback?: React.ReactNode | undefined
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
