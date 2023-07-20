type AnyFunction = (...args: any[]) => any

export const memoize = <T extends AnyFunction>(fn: T) => {
  const cache = Object.create(null)
  return (...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cache[key] === undefined) cache[key] = fn(...args)
    return cache[key]
  }
}
