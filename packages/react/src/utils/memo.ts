export const memo = <T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: any[]) => string,
): T => {
  const cache: Record<string, any> = Object.create(null)
  function get(...args: any[]) {
    const key = getKey?.(...args) ?? args.join("|")
    if (cache[key] === undefined) cache[key] = fn(...args)
    return cache[key]
  }
  return get as T
}
