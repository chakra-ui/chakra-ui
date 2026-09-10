import { describe, expect, it } from "vitest"
import type { Diagnostic } from "../src/transform"
import { dedupeDiagnostics } from "../src/upgrade"

const d = (over: Partial<Diagnostic>): Diagnostic => ({
  level: "warn",
  file: "a.tsx",
  message: "m",
  ...over,
})

describe("dedupeDiagnostics", () => {
  it("collapses identical file+line+message entries", () => {
    const out = dedupeDiagnostics([
      d({ file: "a.tsx", line: 1, message: "x" }),
      d({ file: "a.tsx", line: 1, message: "x" }),
    ])
    expect(out).toHaveLength(1)
  })

  it("keeps distinct messages and distinct locations", () => {
    const out = dedupeDiagnostics([
      d({ file: "a.tsx", line: 1, message: "x" }),
      d({ file: "a.tsx", line: 2, message: "x" }),
      d({ file: "a.tsx", line: 1, message: "y" }),
      d({ file: "b.tsx", line: 1, message: "x" }),
    ])
    expect(out).toHaveLength(4)
  })
})
