import * as React from "react"

export function forwardRef<T extends React.RefForwardingComponent<any, any>>(
  component: T,
) {
  const finalComponent = React.forwardRef(component)
  return (finalComponent as unknown) as T & {
    displayName?: string
  }
}

export function memo<T extends React.ComponentType<any>>(component: T) {
  const finalComponent = React.memo(component)
  return (finalComponent as unknown) as T & {
    displayName?: string
  }
}
