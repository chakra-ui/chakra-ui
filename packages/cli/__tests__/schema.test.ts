import { describe, expect, it } from "vitest"
import { proBlockResponseSchema, processEnvSchema } from "../src/utils/schema"

describe("cli response schemas", () => {
  it("keeps unknown keys in a pro blocks response", () => {
    const parsed = proBlockResponseSchema.parse({
      files: [{ filename: "block.tsx" }],
      pagination: { next: null },
    })

    expect(parsed).toEqual({
      files: [{ filename: "block.tsx" }],
      pagination: { next: null },
    })
  })

  it("defaults the docs URL and rejects a value that is not a URL", () => {
    expect(processEnvSchema.parse({}).CHAKRA_DOCS_URL).toBe(
      "https://chakra-ui.com",
    )
    expect(
      processEnvSchema.safeParse({ CHAKRA_DOCS_URL: "not a url" }).success,
    ).toBe(false)
  })
})
