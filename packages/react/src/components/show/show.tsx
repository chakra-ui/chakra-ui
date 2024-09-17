export interface ShowProps<T> {
  /**
   * If `true`, it'll render the `children` prop
   */
  when: T | null | undefined
  /**
   * The fallback content to render if `when` is `false`
   */
  fallback?: React.ReactNode
  /**
   * The children to render if `when` is `true`
   */
  children: React.ReactNode | ((props: T) => React.ReactNode)
}

export function Show<T>(props: ShowProps<T>) {
  const { when, fallback, children } = props

  if (!when) {
    return fallback || null
  }

  return typeof children === "function" ? children(when as T) : children
}
