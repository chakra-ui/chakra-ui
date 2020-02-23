import { userEvent, render, renderHook } from "@chakra-ui/test-utils"
import * as React from "react"
import { useNumberInput } from "./NumberInput.hook"

// https://github.com/palantir/blueprint/blob/3aa56473d253f5287e0960759bee367a9ff3e045/packages/core/test/controls/numericInputTests.tsx
describe("defaults", () => {
  test("has value of 0 by default", () => {
    const { result } = renderHook(() => useNumberInput())
    expect(result.current.value).toBe(0)
  })
})
