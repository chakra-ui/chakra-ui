import { describe, expect, test, vi } from "vitest"
import { memo } from "../src/utils/memo"

describe("Memo correctness", () => {
  test("memo caches function results correctly", () => {
    const mockFn = vi.fn((x: number) => x * 2)
    const memoizedFn = memo(mockFn)

    // First call should invoke the function
    expect(memoizedFn(5)).toBe(10)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Second call with same argument should use cache
    expect(memoizedFn(5)).toBe(10)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Different argument should invoke function again
    expect(memoizedFn(10)).toBe(20)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test("memo works with multiple arguments", () => {
    const mockFn = vi.fn((a: number, b: number) => a + b)
    const memoizedFn = memo(mockFn)

    // First call
    expect(memoizedFn(1, 2)).toBe(3)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Same arguments should use cache
    expect(memoizedFn(1, 2)).toBe(3)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Different arguments should invoke function
    expect(memoizedFn(2, 3)).toBe(5)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test("memo works with object arguments", () => {
    const mockFn = vi.fn((obj: { x: number; y: number }) => obj.x + obj.y)
    const memoizedFn = memo(mockFn)

    const obj1 = { x: 1, y: 2 }
    const obj2 = { x: 1, y: 2 } // Same content, different reference

    // First call
    expect(memoizedFn(obj1)).toBe(3)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Same object content should use cache
    expect(memoizedFn(obj2)).toBe(3)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Different content should invoke function
    expect(memoizedFn({ x: 2, y: 3 })).toBe(5)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test("memo works with array arguments", () => {
    const mockFn = vi.fn((arr: number[]) => arr.reduce((sum, n) => sum + n, 0))
    const memoizedFn = memo(mockFn)

    // First call
    expect(memoizedFn([1, 2, 3])).toBe(6)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Same array content should use cache
    expect(memoizedFn([1, 2, 3])).toBe(6)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Different content should invoke function
    expect(memoizedFn([2, 3, 4])).toBe(9)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test("memo handles null and undefined correctly", () => {
    const mockFn = vi.fn((value: any) => String(value))
    const memoizedFn = memo(mockFn)

    expect(memoizedFn(null)).toBe("null")
    expect(mockFn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(null)).toBe("null")
    expect(mockFn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(undefined)).toBe("undefined")
    expect(mockFn).toHaveBeenCalledTimes(2)

    expect(memoizedFn(undefined)).toBe("undefined")
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  test("memo works with nested objects", () => {
    const mockFn = vi.fn((obj: any) => JSON.stringify(obj))
    const memoizedFn = memo(mockFn)

    const nested = {
      a: {
        b: {
          c: "value",
        },
      },
    }

    const result1 = memoizedFn(nested)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Same structure should use cache
    const nested2 = {
      a: {
        b: {
          c: "value",
        },
      },
    }
    const result2 = memoizedFn(nested2)
    expect(result1).toBe(result2)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test("memo respects LRU cache size limit", () => {
    // This test is more about ensuring the implementation doesn't crash
    // with many different keys rather than testing exact LRU behavior
    const mockFn = vi.fn((x: number) => x * 2)
    const memoizedFn = memo(mockFn)

    // Generate more calls than cache size (default 500)
    for (let i = 0; i < 1000; i++) {
      memoizedFn(i)
    }

    // Should not crash and should have called function for each unique input
    expect(mockFn).toHaveBeenCalledTimes(1000)

    // Some early values should have been evicted and require re-computation
    const initialCallCount = mockFn.mock.calls.length
    memoizedFn(0) // This should be evicted and require re-computation
    expect(mockFn.mock.calls.length).toBeGreaterThan(initialCallCount)
  })

  test("memo maintains function signature and context", () => {
    function originalFunction(this: { multiplier: number }, x: number) {
      return x * this.multiplier
    }

    const context = { multiplier: 3 }
    const memoizedFn = memo(originalFunction)

    expect(memoizedFn.call(context, 5)).toBe(15)
    expect(memoizedFn.call(context, 5)).toBe(15) // Should use cache
  })
})
