import stringify from "fast-safe-stringify"

export const memo = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache: Record<string, any> = Object.create(null)
  function get(...args: any[]) {
    const key = args.map((v) => stringify(v)).join("|")
    if (cache[key] === undefined) cache[key] = fn(...args)
    return cache[key]
  }
  return get as T
}
