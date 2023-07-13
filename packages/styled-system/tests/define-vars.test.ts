import { defineCssVars } from "../src"

describe("defineCssVars", () => {
  test("should create vars group", () => {
    const badge = defineCssVars("badge", ["bg", "border"])
    expect(badge).toMatchInlineSnapshot(`
      Object {
        "bg": Object {
          "reference": "var(--badge-bg)",
          "variable": "--badge-bg",
        },
        "border": Object {
          "reference": "var(--badge-border)",
          "variable": "--badge-border",
        },
      }
    `)
  })

  test("should create vars with fallback", () => {
    const badge = defineCssVars("badge", [
      "bg",
      ["border", "0px"],
      ["size", "1rem"],
    ])

    expect(badge).toMatchInlineSnapshot(`
      Object {
        "bg": Object {
          "reference": "var(--badge-bg)",
          "variable": "--badge-bg",
        },
        "border": Object {
          "reference": "var(--badge-border, 0px)",
          "variable": "--badge-border",
        },
        "size": Object {
          "reference": "var(--badge-size, 1rem)",
          "variable": "--badge-size",
        },
      }
    `)
  })
})
