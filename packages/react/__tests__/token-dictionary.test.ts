import { createTokenDictionary } from "../src/styled-system/token-dictionary"
import type { TokenDictionary } from "../src/styled-system/types"

/** All tokens in the dictionary (stable array for snapshots). */
const res = (dict: TokenDictionary) => {
  return dict.allTokens.map(({ name, value }) => ({ name, value }))
}

/** Resolved values for a fixed set of token names (stable object for snapshots). */
const resByName = (dict: TokenDictionary, names: string[]) => {
  const map = Object.fromEntries(dict.allTokens.map((t) => [t.name, t.value]))
  return Object.fromEntries(names.map((n) => [n, map[n]]))
}

/** Rows for every branch of a semantic token (same `name`, different `condition`). */
const resBranches = (dict: TokenDictionary, tokenName: string) => {
  return dict.allTokens
    .filter((t) => t.name === tokenName)
    .map((t) => ({
      condition: t.extensions.condition ?? "",
      value: t.value,
    }))
    .sort((a, b) => a.condition.localeCompare(b.condition))
}

describe("token dictionary", () => {
  test("simple example", () => {
    const dict = createTokenDictionary({
      tokens: {
        colors: {
          pink: { value: "#ff00ff" },
          red: { 300: { value: "#ff0000" } },
        },
      },
    })

    expect(res(dict)).toMatchInlineSnapshot(`
      [
        {
          "name": "colors.pink",
          "value": "#ff00ff",
        },
        {
          "name": "colors.red.300",
          "value": "#ff0000",
        },
        {
          "name": "colors.colorPalette",
          "value": "colors.colorPalette",
        },
        {
          "name": "colors.colorPalette.300",
          "value": "colors.colorPalette.300",
        },
      ]
    `)
  })

  test("semantic tokens / simple", () => {
    const dict = createTokenDictionary({
      semanticTokens: {
        colors: {
          test: { value: "#fff" },
        },
      },
    })

    expect(res(dict)).toMatchInlineSnapshot(`
      [
        {
          "name": "colors.test",
          "value": "#fff",
        },
        {
          "name": "colors.colorPalette",
          "value": "colors.colorPalette",
        },
      ]
    `)
  })

  test("semantic tokens / nested", () => {
    const dict = createTokenDictionary({
      semanticTokens: {
        colors: {
          grabbed: { value: { base: "#fff" } },
          disabled: { value: { "@light": "#333", "@dark": "#222" } },
          button: {
            primary: { value: { base: "red" } },
          },
        },
      },
    })

    expect(res(dict)).toMatchInlineSnapshot(`
      [
        {
          "name": "colors.grabbed",
          "value": "#fff",
        },
        {
          "name": "colors.button.primary",
          "value": "red",
        },
        {
          "name": "colors.disabled",
          "value": "#333",
        },
        {
          "name": "colors.disabled",
          "value": "#222",
        },
        {
          "name": "colors.colorPalette",
          "value": "colors.colorPalette",
        },
        {
          "name": "colors.colorPalette.primary",
          "value": "colors.colorPalette.primary",
        },
      ]
    `)
  })

  test("getByName returns semantic token metadata with conditions", () => {
    const dict = createTokenDictionary({
      semanticTokens: {
        colors: {
          accent: { value: { base: "red", _dark: "blue" } },
        },
      },
    })

    const token = dict.getByName("colors.accent")

    expect(token?.value).toBe("red")
    expect(token?.extensions.condition).toBe("base")
    expect(token?.extensions.conditions).toEqual({ base: "red", _dark: "blue" })
  })

  test("semantic token references preserve conditional token references", () => {
    const dict = createTokenDictionary({
      prefix: "chakra",
      tokens: {
        colors: {
          blue: {
            100: { value: "#dbeafe" },
            900: { value: "#14204a" },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            value: {
              base: "{colors.blue.900}",
              _dark: "{colors.blue.100}",
            },
          },
          fg: {
            DEFAULT: {
              value: "{colors.primary}",
            },
          },
        },
      },
    })

    expect(dict.getByName("colors.fg")?.value).toBe(
      "var(--chakra-colors-primary)",
    )
  })

  test("comma-list token categories: array value is joined (fonts, shadows, …) — issue #10763", () => {
    const dict = createTokenDictionary({
      tokens: {
        fonts: {
          body: { value: "sans-serif" },
          heading: { value: ["monospace"] },
          display: { value: ["Inter", "system-ui", "sans-serif"] },
        },
        shadows: {
          layered: {
            value: [
              "0 1px 2px rgb(0 0 0 / 0.05)",
              "0 2px 4px rgb(0 0 0 / 0.1)",
            ],
          },
        },
      },
    })

    expect(
      resByName(dict, [
        "fonts.body",
        "fonts.heading",
        "fonts.display",
        "shadows.layered",
      ]),
    ).toMatchInlineSnapshot(`
      {
        "fonts.body": "sans-serif",
        "fonts.display": "Inter, system-ui, sans-serif",
        "fonts.heading": "monospace",
        "shadows.layered": "0 1px 2px rgb(0 0 0 / 0.05), 0 2px 4px rgb(0 0 0 / 0.1)",
      }
    `)
  })

  test("easings: array value becomes cubic-bezier()", () => {
    const dict = createTokenDictionary({
      tokens: {
        easings: {
          smooth: { value: [0.4, 0, 0.2, 1] },
        },
      },
    })

    expect(resByName(dict, ["easings.smooth"])).toMatchInlineSnapshot(`
      {
        "easings.smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    `)
  })

  test("semantic comma-list tokens: array values in conditions are joined", () => {
    const dict = createTokenDictionary({
      semanticTokens: {
        fonts: {
          caption: {
            value: { base: ["Inter"], md: ["Georgia", "serif"] },
          },
        },
      },
    })

    expect(resBranches(dict, "fonts.caption")).toMatchInlineSnapshot(`
      [
        {
          "condition": "base",
          "value": "Inter",
        },
        {
          "condition": "md",
          "value": "Georgia, serif",
        },
      ]
    `)
  })

  test("with DEFAULT", () => {
    const dict = createTokenDictionary({
      tokens: {
        colors: {
          red: {
            DEFAULT: { value: "#red" },
          },
        },
      },
      semanticTokens: {
        colors: {
          error: { value: "{colors.red}" },
        },
      },
    })

    expect(dict.allTokens).toMatchInlineSnapshot(`
      [
        {
          "extensions": {
            "category": "colors",
            "colorPalette": {
              "keys": [
                [
                  "",
                ],
              ],
              "roots": [
                [
                  "red",
                ],
              ],
              "value": "red",
            },
            "condition": "base",
            "cssVar": {
              "ref": "var(--colors-red)",
              "var": "--colors-red",
            },
            "default": true,
            "originalPath": [
              "colors",
              "red",
            ],
            "prop": "red",
          },
          "name": "colors.red",
          "originalValue": "#red",
          "path": [
            "colors",
            "red",
          ],
          "value": "#red",
        },
        {
          "extensions": {
            "category": "colors",
            "colorPalette": {
              "keys": [
                [
                  "",
                ],
              ],
              "roots": [
                [
                  "error",
                ],
              ],
              "value": "error",
            },
            "condition": "base",
            "conditions": {
              "base": "{colors.red}",
            },
            "cssVar": {
              "ref": "var(--colors-error)",
              "var": "--colors-error",
            },
            "originalPath": [
              "colors",
              "error",
            ],
            "prop": "error",
          },
          "name": "colors.error",
          "originalValue": "{colors.red}",
          "path": [
            "colors",
            "error",
          ],
          "value": "var(--colors-red)",
        },
        {
          "extensions": {
            "category": "colors",
            "condition": "base",
            "cssVar": {
              "ref": "var(--colors-color-palette)",
              "var": "--colors-color-palette",
            },
            "originalPath": [
              "colors",
              "colorPalette",
            ],
            "prop": "colorPalette",
            "virtual": true,
          },
          "name": "colors.colorPalette",
          "originalValue": "colors.colorPalette",
          "path": [
            "colors",
            "colorPalette",
          ],
          "value": "colors.colorPalette",
        },
      ]
    `)
  })
})
