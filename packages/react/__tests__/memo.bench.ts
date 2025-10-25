import stringify from "fast-safe-stringify"
import { bench } from "vitest"

// Old memo implementation (using JSON stringify)
const oldMemo = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache: Record<string, any> = Object.create(null)
  function get(...args: any[]) {
    const key = args.map((v) => stringify(v)).join("|")
    if (cache[key] === undefined) cache[key] = fn(...args)
    return cache[key]
  }
  return get as T
}

// New memo implementation (hash-based with LRU)
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

class LRUCache<K, V> {
  private cache = new Map<K, V>()
  private maxSize: number

  constructor(maxSize: number = 500) {
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    this.cache.set(key, value)
  }
}

const newMemo = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new LRUCache<string, any>()

  function get(...args: any[]) {
    const key =
      args.length === 1 ? simpleHash(args[0]) : args.map(simpleHash).join("|")

    let result = cache.get(key)
    if (result === undefined) {
      result = fn(...args)
      cache.set(key, result)
    }
    return result
  }
  return get as T
}

// Test function for memoization
const expensiveFunction = (value: any) => {
  // Simulate some work
  return `processed:${JSON.stringify(value)}`
}

// Sample test data (realistic for styled-system usage)
const testData = [
  "color",
  "red.500",
  { padding: "4", margin: "2" },
  ["sm", "md", "lg"],
  { base: "red", sm: "blue", md: "green" },
  42,
  true,
  null,
  undefined,
  { nested: { deep: { value: "test" } } },
]

// Use global to prevent optimization
let globalSum = 0

// Baseline - new memo implementation
bench(
  "baseline - new memo (hash + LRU)",
  () => {
    const memoizedFn = newMemo(expensiveFunction)
    for (const data of testData) {
      const result = memoizedFn(data)
      globalSum += result.length
    }
  },
  { baseline: true } as any,
)

// Old implementation for comparison
bench("old memo (JSON stringify)", () => {
  const memoizedFn = oldMemo(expensiveFunction)
  for (const data of testData) {
    const result = memoizedFn(data)
    globalSum += result.length
  }
})

// Test cache hit performance (realistic usage)
bench("new memo with cache hits", () => {
  const memoizedFn = newMemo(expensiveFunction)
  // Pre-populate cache
  for (const data of testData) {
    memoizedFn(data)
  }
  // Now test repeated access (cache hits)
  for (let i = 0; i < 100; i++) {
    for (const data of testData) {
      const result = memoizedFn(data)
      globalSum += result.length
    }
  }
})

bench("old memo with cache hits", () => {
  const memoizedFn = oldMemo(expensiveFunction)
  // Pre-populate cache
  for (const data of testData) {
    memoizedFn(data)
  }
  // Now test repeated access (cache hits)
  for (let i = 0; i < 100; i++) {
    for (const data of testData) {
      const result = memoizedFn(data)
      globalSum += result.length
    }
  }
})

// Test single argument optimization
bench("new memo single args", () => {
  const memoizedFn = newMemo((x: string) => `result:${x}`)
  const singleArgs = ["red", "blue", "green", "yellow", "purple"]
  for (let i = 0; i < 1000; i++) {
    for (const arg of singleArgs) {
      const result = memoizedFn(arg)
      globalSum += result.length
    }
  }
})

bench("old memo single args", () => {
  const memoizedFn = oldMemo((x: string) => `result:${x}`)
  const singleArgs = ["red", "blue", "green", "yellow", "purple"]
  for (let i = 0; i < 1000; i++) {
    for (const arg of singleArgs) {
      const result = memoizedFn(arg)
      globalSum += result.length
    }
  }
})

// Multi-argument benchmarks (realistic styled-system usage)
bench("new memo multi args", () => {
  const memoizedFn = newMemo((prop: string, value: any, condition: string) => {
    return `${prop}:${JSON.stringify(value)}@${condition}`
  })

  const multiArgs = [
    ["color", "red.500", "base"],
    ["padding", { base: "4", sm: "8" }, "responsive"],
    ["margin", ["2", "4", "6"], "breakpoint"],
    ["fontSize", "lg", "hover"],
    ["backgroundColor", { r: 255, g: 0, b: 0 }, "focus"],
  ] as const

  for (let i = 0; i < 500; i++) {
    for (const [prop, value, condition] of multiArgs) {
      const result = memoizedFn(prop, value, condition)
      globalSum += result.length
    }
  }
})

bench("old memo multi args", () => {
  const memoizedFn = oldMemo((prop: string, value: any, condition: string) => {
    return `${prop}:${JSON.stringify(value)}@${condition}`
  })

  const multiArgs = [
    ["color", "red.500", "base"],
    ["padding", { base: "4", sm: "8" }, "responsive"],
    ["margin", ["2", "4", "6"], "breakpoint"],
    ["fontSize", "lg", "hover"],
    ["backgroundColor", { r: 255, g: 0, b: 0 }, "focus"],
  ] as const

  for (let i = 0; i < 500; i++) {
    for (const [prop, value, condition] of multiArgs) {
      const result = memoizedFn(prop, value, condition)
      globalSum += result.length
    }
  }
})

// Complex object benchmarks (token resolution style)
bench("new memo complex objects", () => {
  const memoizedFn = newMemo(
    (tokenPath: string[], conditions: Record<string, any>, metadata: any) => {
      return JSON.stringify({ tokenPath, conditions, metadata })
    },
  )

  const complexArgs = [
    [
      ["colors", "red", "500"],
      { base: true, dark: false },
      { category: "colors", virtual: false },
    ],
    [
      ["spacing", "4"],
      { sm: true, md: true },
      { category: "spacing", negative: true },
    ],
    [
      ["fonts", "heading"],
      { print: false },
      { category: "fonts", default: true },
    ],
    [
      ["shadows", "xl"],
      { hover: true },
      { category: "shadows", condition: "interactive" },
    ],
  ]

  for (let i = 0; i < 300; i++) {
    for (const [tokenPath, conditions, metadata] of complexArgs) {
      const result = memoizedFn(tokenPath as string[], conditions, metadata)
      globalSum += result.length
    }
  }
})

bench("old memo complex objects", () => {
  const memoizedFn = oldMemo(
    (tokenPath: string[], conditions: Record<string, any>, metadata: any) => {
      return JSON.stringify({ tokenPath, conditions, metadata })
    },
  )

  const complexArgs = [
    [
      ["colors", "red", "500"],
      { base: true, dark: false },
      { category: "colors", virtual: false },
    ],
    [
      ["spacing", "4"],
      { sm: true, md: true },
      { category: "spacing", negative: true },
    ],
    [
      ["fonts", "heading"],
      { print: false },
      { category: "fonts", default: true },
    ],
    [
      ["shadows", "xl"],
      { hover: true },
      { category: "shadows", condition: "interactive" },
    ],
  ]

  for (let i = 0; i < 300; i++) {
    for (const [tokenPath, conditions, metadata] of complexArgs) {
      const result = memoizedFn(tokenPath as string[], conditions, metadata)
      globalSum += result.length
    }
  }
})
