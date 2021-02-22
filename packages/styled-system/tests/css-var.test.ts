import { toCSSVariables } from "../src/css-var"

test("should convert to css variables", () => {
  expect(
    toCSSVariables({
      space: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "__cssMap": Object {
        "space.-lg": Object {
          "value": "-24px",
          "var": "--space-lg",
          "varRef": "calc(var(--space-lg) * -1)",
        },
        "space.-md": Object {
          "value": "-16px",
          "var": "--space-md",
          "varRef": "calc(var(--space-md) * -1)",
        },
        "space.-sm": Object {
          "value": "-8px",
          "var": "--space-sm",
          "varRef": "calc(var(--space-sm) * -1)",
        },
        "space.lg": Object {
          "value": "24px",
          "var": "--space-lg",
          "varRef": "var(--space-lg)",
        },
        "space.md": Object {
          "value": "16px",
          "var": "--space-md",
          "varRef": "var(--space-md)",
        },
        "space.sm": Object {
          "value": "8px",
          "var": "--space-sm",
          "varRef": "var(--space-sm)",
        },
      },
      "__cssVars": Object {
        "--space-lg": "24px",
        "--space-md": "16px",
        "--space-sm": "8px",
      },
      "space": Object {
        "lg": "24px",
        "md": "16px",
        "sm": "8px",
      },
    }
  `)
})

test("should convert to css variables", () => {
  expect(
    toCSSVariables({
      space: [8, 12, 16, 33],
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "__cssMap": Object {
        "space.-0": Object {
          "value": "-8",
          "var": "--space-0",
          "varRef": "calc(var(--space-0) * -1)",
        },
        "space.-1": Object {
          "value": "-12",
          "var": "--space-1",
          "varRef": "calc(var(--space-1) * -1)",
        },
        "space.-2": Object {
          "value": "-16",
          "var": "--space-2",
          "varRef": "calc(var(--space-2) * -1)",
        },
        "space.-3": Object {
          "value": "-33",
          "var": "--space-3",
          "varRef": "calc(var(--space-3) * -1)",
        },
        "space.0": Object {
          "value": 8,
          "var": "--space-0",
          "varRef": "var(--space-0)",
        },
        "space.1": Object {
          "value": 12,
          "var": "--space-1",
          "varRef": "var(--space-1)",
        },
        "space.2": Object {
          "value": 16,
          "var": "--space-2",
          "varRef": "var(--space-2)",
        },
        "space.3": Object {
          "value": 33,
          "var": "--space-3",
          "varRef": "var(--space-3)",
        },
      },
      "__cssVars": Object {
        "--space-0": 8,
        "--space-1": 12,
        "--space-2": 16,
        "--space-3": 33,
      },
      "space": Array [
        8,
        12,
        16,
        33,
      ],
    }
  `)
})
