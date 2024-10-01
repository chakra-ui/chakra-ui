import { describe, expect, test } from "vitest"
import { sortAtParams } from "../src/styled-system/sort-at-params"

describe("sort-at-rules", () => {
  test(`test 1`, () => {
    const receivedOrder = [
      "screen and (max-width: 640px)",
      "screen and (min-width: 980px)",
      "screen and (max-width: 980px)",
      "tv",
      "screen and (max-width: 768px)",
      "screen and (min-width: 640px)",
      "print",
      "screen and (min-width: 1280px)",
      "screen",
      "screen and (min-width: 768px)",
      "screen and (max-width: 1280px)",
    ]

    const received = receivedOrder.sort(sortAtParams)
    expect(received).toMatchInlineSnapshot(`
      [
        "screen and (min-width: 640px)",
        "screen and (min-width: 768px)",
        "screen and (min-width: 980px)",
        "screen and (min-width: 1280px)",
        "screen and (max-width: 1280px)",
        "screen and (max-width: 980px)",
        "screen and (max-width: 768px)",
        "screen and (max-width: 640px)",
        "screen",
        "tv",
        "print",
      ]
    `)
  })

  test("test 2", () => {
    const receivedOrder = [
      "@media tv",
      "@media print and (orientation: landscape)",
      "@media screen and (min-width: 1280px)",
      "@media screen and (max-width: 640px)",
      "@media screen and (orientation: landscape)",
      "@media print",
      "@media screen and (orientation: portrait)",
      "@media screen and (min-width: 768px)",
      "@media screen and (max-width: 1280px)",
      "@media screen and (width <= 1200px)",
      "@media print and (orientation: portrait)",
    ]

    expect(receivedOrder.sort(sortAtParams)).toMatchInlineSnapshot(`
      [
        "@media screen and (min-width: 768px)",
        "@media screen and (width <= 1200px)",
        "@media screen and (min-width: 1280px)",
        "@media screen and (max-width: 1280px)",
        "@media screen and (max-width: 640px)",
        "@media screen and (orientation: landscape)",
        "@media screen and (orientation: portrait)",
        "@media tv",
        "@media print",
        "@media print and (orientation: landscape)",
        "@media print and (orientation: portrait)",
      ]
    `)
  })

  test("test 3", () => {
    const receivedOrder = [
      "@media tv",
      "@media print and (orientation: landscape)",
      "@media screen and (min-width: 1280px)",
      "@media screen and (max-width: 640px)",
      "@media screen and (width > 640px)",
      "@media screen and (orientation: landscape)",
      "@media print",
      "@media screen and (orientation: portrait)",
      "@media screen and (min-width: 768px)",
      "@media screen and (max-width: 1280px)",
      "@media print and (orientation: portrait)",
    ]

    expect(receivedOrder.sort(sortAtParams)).toMatchInlineSnapshot(`
      [
        "@media screen and (min-width: 1280px)",
        "@media screen and (max-width: 1280px)",
        "@media screen and (max-width: 640px)",
        "@media screen and (width > 640px)",
        "@media screen and (min-width: 768px)",
        "@media screen and (orientation: landscape)",
        "@media screen and (orientation: portrait)",
        "@media tv",
        "@media print",
        "@media print and (orientation: landscape)",
        "@media print and (orientation: portrait)",
      ]
    `)
  })

  test("test 4", () => {
    const receivedOrder = [
      "@media screen and (max-width: 640px)",
      "@media screen and (min-width: 980px)",
      "@media screen and (max-width: 980px)",
      "@media screen and (max-width: 768px)",
      "@media screen and (min-width: 640px)",
      "@media screen and (min-width: 1280px)",
      "@media screen and (min-width: 768px)",
      "@media screen and (max-width: 1280px)",
    ]

    expect(receivedOrder.sort(sortAtParams)).toMatchInlineSnapshot(`
      [
        "@media screen and (min-width: 640px)",
        "@media screen and (min-width: 768px)",
        "@media screen and (min-width: 980px)",
        "@media screen and (min-width: 1280px)",
        "@media screen and (max-width: 1280px)",
        "@media screen and (max-width: 980px)",
        "@media screen and (max-width: 768px)",
        "@media screen and (max-width: 640px)",
      ]
    `)
  })
})
