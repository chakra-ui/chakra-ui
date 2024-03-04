import { createTokenDictionary } from "../src/styled-system/token-dictionary"
import { TokenDictionary } from "../src/styled-system/types"

const res = (dict: TokenDictionary) => {
  return dict.allTokens.map(({ name, value }) => ({ name, value }))
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
          "value": {
            "value": "#ff00ff",
          },
        },
        {
          "name": "colors.red.300",
          "value": {
            "value": "#ff0000",
          },
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
          "name": "colors.disabled",
          "value": "#333",
        },
        {
          "name": "colors.disabled",
          "value": "#222",
        },
        {
          "name": "colors.button.primary",
          "value": "red",
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
              "ref": "var(--colors\\.red)",
              "var": "--colors\\.red",
            },
            "default": true,
            "originalPath": [
              "colors",
              "red",
            ],
            "prop": "red",
          },
          "name": "colors.red",
          "originalValue": {
            "value": "#red",
          },
          "path": [
            "colors",
            "red",
          ],
          "value": {
            "value": "#red",
          },
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
            "condition": "value",
            "conditions": {
              "value": "{colors.red}",
            },
            "cssVar": {
              "ref": "var(--colors\\.error)",
              "var": "--colors\\.error",
            },
            "originalPath": [
              "colors",
              "error",
            ],
            "prop": "error",
          },
          "name": "colors.error",
          "originalValue": "",
          "path": [
            "colors",
            "error",
          ],
          "value": "var(--colors\\.red)",
        },
        {
          "extensions": {
            "category": "colors",
            "condition": "base",
            "cssVar": {
              "ref": "var(--colors\\.color-palette)",
              "var": "--colors\\.color-palette",
            },
            "originalPath": [
              "colors",
              "colorPalette",
            ],
            "prop": "colors.colorPalette",
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
