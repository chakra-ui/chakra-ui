export interface ForProps<T> {
  each: T[] | readonly T[]
  fallback?: React.ReactNode
  children: (item: T, index: number) => React.ReactNode
}

export function For<T>(props: ForProps<T>): React.ReactNode {
  const { each, fallback, children } = props

  if (each.length === 0) {
    return fallback || null
  }

  return each.map(children)
}
