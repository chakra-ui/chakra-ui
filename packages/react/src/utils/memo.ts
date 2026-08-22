// Efficient hash function for cache keys
function simpleHash(value: any): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"

  const type = typeof value
  if (type === "string") return `s:${value}`
  if (type === "number") return `n:${value}`
  if (type === "boolean") return `b:${value}`
  if (type === "function") return `f:${value.name || "anonymous"}`

  if (Array.isArray(value)) {
    return `a:[${value.map(simpleHash).join(",")}]`
  }

  if (type === "object") {
    const keys = Object.keys(value).sort()
    return `o:{${keys.map((k) => `${k}:${simpleHash(value[k])}`).join(",")}}`
  }

  return String(value)
}

// Simple LRU Cache implementation
class LRUCache<K, V> {
  private cache = new Map<K, V>()
  private maxSize: number

  constructor(maxSize: number = 500) {
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    this.cache.set(key, value)
  }

  clear(): void {
    this.cache.clear()
  }
}

export const memo = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new LRUCache<string, any>()

  function get(this: any, ...args: any[]) {
    // Optimize for single-argument case (most common)
    const key =
      args.length === 1 ? simpleHash(args[0]) : args.map(simpleHash).join("|")

    let result = cache.get(key)
    if (result === undefined) {
      result = fn.apply(this, args)
      cache.set(key, result)
    }
    return result
  }
  return get as T
}
