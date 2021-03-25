/**
 * 📝 Notes for Contributors:
 *
 * - Ensure you write tests for component behavior defined in the hook.
 * - Ensure you write tests for the accessibility and interactions.
 * - No snapshot tests for components please! 🙂
 *
 * @see Testing-Guide https://chakra-ui.com/guides/component-guide#4-build-and-test
 */

import { renderHook } from "@chakra-ui/test-utils"
import * as React from "react"
import { useReactutils } from "../src"

describe("useReactutils", () => {
  test("it works", () => {
    expect(true).toBeTruthy()
  })
})
