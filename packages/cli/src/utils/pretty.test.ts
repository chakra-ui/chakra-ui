import { describe, expect, it, vi } from "vitest"
import { pretty } from "./pretty"

describe("pretty", () => {
  it("returns a string for valid typescript input", async () => {
    const input = `export type Foo = "a" | "b"`
    const result = await pretty(input)
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })

  it("preserves semantic content when formatting", async () => {
    const input = `export interface Conditions { base: string }`
    const result = await pretty(input)
    expect(result).toContain("Conditions")
    expect(result).toContain("base")
    expect(result).toContain("string")
  })

  it("falls back to raw string when prettier is unavailable", async () => {
    vi.doMock("prettier", () => {
      throw new Error("Cannot find module 'prettier'")
    })

    const input = `export type Token = "color.red" | "color.blue"`
    const result = await pretty(input)

    // Must not throw — returns original string unchanged
    expect(result).toBe(input)

    vi.doUnmock("prettier")
  })

  it("does not mutate the input string", async () => {
    const input = `export type Foo = "a"`
    const original = input
    await pretty(input)
    expect(input).toBe(original)
  })
})
