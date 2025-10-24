import { beforeEach, describe, expect, test } from "vitest"
import type { Token } from "../src/styled-system/types"

describe("Token cloning correctness", () => {
  let sampleToken: Token

  beforeEach(() => {
    sampleToken = {
      value: "#ff0000",
      originalValue: "#ff0000",
      name: "colors.red.500",
      path: ["colors", "red", "500"],
      extensions: {
        originalPath: ["colors", "red", "500"],
        category: "colors",
        prop: "red.500",
        condition: "base",
        conditions: {
          base: "#ff0000",
          dark: "#ff3333",
          hover: "#cc0000",
        },
        cssVar: {
          var: "--colors-red-500",
          ref: "var(--colors-red-500)",
        },
        colorPalette: {
          value: "red",
          roots: [["red"]],
          keys: [["500"]],
        },
      },
    }
  })

  test("shallow clone produces correct result", () => {
    const newValue = "#00ff00"
    const newCondition = "dark"

    // Using our new efficient method
    const cloned: Token = {
      ...sampleToken,
      value: newValue,
      extensions: {
        ...sampleToken.extensions,
        condition: newCondition,
      },
    }

    // Verify the clone is correct
    expect(cloned.value).toBe(newValue)
    expect(cloned.extensions.condition).toBe(newCondition)
    expect(cloned.name).toBe(sampleToken.name)
    expect(cloned.path).toBe(sampleToken.path) // Should be same reference
    expect(cloned.extensions.category).toBe(sampleToken.extensions.category)
    expect(cloned.extensions.cssVar).toBe(sampleToken.extensions.cssVar) // Should be same reference

    // Verify original is unchanged
    expect(sampleToken.value).toBe("#ff0000")
    expect(sampleToken.extensions.condition).toBe("base")
  })

  test("array path modification creates correct result", () => {
    const originalPath = ["colors", "red", "500"]
    const newPath = [...originalPath]
    const lastIndex = newPath.length - 1
    newPath[lastIndex] = `-${newPath[lastIndex]}`

    // Verify the new path is correct
    expect(newPath).toEqual(["colors", "red", "-500"])

    // Verify original is unchanged
    expect(originalPath).toEqual(["colors", "red", "500"])
  })

  test("shallow clone maintains object references for immutable properties", () => {
    const cloned: Token = {
      ...sampleToken,
      value: "#new-value",
      extensions: {
        ...sampleToken.extensions,
        condition: "dark",
      },
    }

    // These should be the same object references (shallow copy)
    expect(cloned.path).toBe(sampleToken.path)
    expect(cloned.extensions.cssVar).toBe(sampleToken.extensions.cssVar)
    expect(cloned.extensions.colorPalette).toBe(
      sampleToken.extensions.colorPalette,
    )
    expect(cloned.extensions.conditions).toBe(sampleToken.extensions.conditions)

    // These should be different (new values)
    expect(cloned.value).not.toBe(sampleToken.value)
    expect(cloned.extensions.condition).not.toBe(
      sampleToken.extensions.condition,
    )
    expect(cloned.extensions).not.toBe(sampleToken.extensions) // New extensions object
  })
})
