import { bench } from "vitest"
import type { Token } from "../src/styled-system/types"

// Create a realistic token with nested structure
const sampleToken: Token = {
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

// Use a global variable to prevent optimization
let globalSum = 0

// Baseline benchmark - shallow clone token (most common operation)
bench(
  "baseline - shallow clone token",
  () => {
    const cloned: Token = {
      ...sampleToken,
      value: "#updated",
      extensions: {
        ...sampleToken.extensions,
        condition: "dark",
      },
    }
    globalSum += cloned.name.length
  },
  { baseline: true } as any,
)

bench("structuredClone token", () => {
  const cloned = structuredClone(sampleToken)
  cloned.value = "#updated"
  cloned.extensions.condition = "dark"
  // Use result to prevent optimization
  globalSum += cloned.name.length
})

bench("array path cloning with spread", () => {
  const originalPath = sampleToken.path
  const newPath = [...originalPath]
  newPath[newPath.length - 1] = `-${newPath[newPath.length - 1]}`
  globalSum += newPath.join(".").length
})

bench("array path cloning with Array.from", () => {
  const originalPath = sampleToken.path
  const newPath = Array.from(originalPath)
  newPath[newPath.length - 1] = `-${newPath[newPath.length - 1]}`
  globalSum += newPath.join(".").length
})

// More intensive benchmark that does multiple operations
bench("structuredClone with 100 iterations", () => {
  for (let i = 0; i < 100; i++) {
    const cloned = structuredClone(sampleToken)
    cloned.value = `#${i.toString(16).padStart(6, "0")}`
    cloned.extensions.condition = `condition-${i}`
    globalSum += cloned.name.length
  }
})
