export interface ForProps<T> {
  each: T[] | readonly T[] | undefined
  fallback?: React.ReactNode
  children: (item: Exclude<T, undefined>, index: number) => React.ReactNode
}

export function For<T extends string | number | undefined>(
  props: ForProps<T>,
): React.ReactNode
export function For<T>(props: ForProps<T>): React.ReactNode {
  const { each, fallback, children } = props

  if (each?.length === 0) {
    return fallback || null
  }

  return each?.map(children as any)
}
