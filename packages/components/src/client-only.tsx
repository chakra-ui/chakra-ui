export interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ClientOnly = (props: ClientOnlyProps): React.ReactNode => {
  const { children, fallback } = props

  if (typeof document === "undefined") {
    return fallback || null
  }

  return <>{children}</>
}
