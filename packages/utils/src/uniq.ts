export const uniq = <T>(...items: T[]) => {
  const _items = items.filter(Boolean)
  return Array.from(new Set(_items))
}
