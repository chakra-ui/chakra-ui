export const uniq = <T>(...items: T[][]): T[] => {
  const set = items.reduce<Set<T>>((acc, curr) => {
    if (curr != null) curr.forEach((item) => acc.add(item))
    return acc
  }, new Set([]))
  return Array.from(set)
}
