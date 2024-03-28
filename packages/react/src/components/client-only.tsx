"use client"

import { useEffect, useState } from "react"

export interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ClientOnly = (props: ClientOnlyProps): React.ReactNode => {
  const { children, fallback } = props
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback || null
  }

  return <>{children}</>
}
