import { createSystem } from "../src"

const { cva } = createSystem({
  conditions: {
    hover: "&:hover",
    focus: "&:focus",
    active: "&:active",
  },
  theme: {
    breakpoints: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
    },
    tokens: {
      colors: {
        pink: {
          400: { value: "#pink400" },
        },
      },
    },
    semanticTokens: {},
  },
  utilities: {
    marginTop: { shorthand: "mt", values: "spacing" },
    color: { values: "colors" },
  },
})

describe("cva", () => {
  test("it works", () => {
    const result = cva({
      base: {
        color: "pink.400",
        marginTop: "sm",
      },
      variants: {
        size: {
          sm: {
            mt: "md",
          },
        },
      },
    })

    expect(result.variantKeys).toMatchInlineSnapshot(`
      [
        "size",
      ]
    `)

    expect(result.variantMap).toMatchInlineSnapshot(`
      {
        "size": [
          "sm",
        ],
      }
    `)

    expect(result({ size: "sm" })).toMatchInlineSnapshot(`
      {
        "@layer recipes": {
          "color": "var(--chakra-colors-pink-400)",
          "marginTop": "md",
        },
      }
    `)
  })

  test("responsive - array", () => {
    const result = cva({
      base: {
        color: "pink.400",
        marginTop: "100px",
      },
      variants: {
        size: {
          sm: {
            mt: "20px",
          },
          md: {
            mt: "30px",
          },
        },
        caps: {
          true: {
            textTransform: "uppercase",
          },
        },
      },
    })

    expect(result({ size: ["sm", "md"], caps: true })).toMatchInlineSnapshot(`
      {
        "@layer recipes": {
          "@media screen and (min-width: 30rem)": {
            "marginTop": "30px",
          },
          "color": "var(--chakra-colors-pink-400)",
          "marginTop": "20px",
          "textTransform": "uppercase",
        },
      }
    `)
  })

  test("responsive - object", () => {
    const result = cva({
      base: {
        color: "pink.400",
        marginTop: "100px",
      },
      variants: {
        size: {
          sm: {
            mt: "20px",
          },
          md: {
            mt: "30px",
          },
        },
        caps: {
          true: {
            textTransform: "uppercase",
          },
        },
      },
    })

    expect(result({ size: { base: "sm", sm: "md" }, caps: true }))
      .toMatchInlineSnapshot(`
        {
          "@layer recipes": {
            "@media screen and (min-width: 30rem)": {
              "marginTop": "30px",
            },
            "color": "var(--chakra-colors-pink-400)",
            "marginTop": "20px",
            "textTransform": "uppercase",
          },
        }
      `)
  })

  test("resolves each variant prop order independently", () => {
    const recipe = cva({
      variants: {
        size: { md: { mt: "20px" } },
        tone: { solid: { mt: "30px", color: "pink.400" } },
      },
    })

    // Both calls pass the same variants, so they only get separate memo
    // entries if prop order is part of the cache key. The later prop wins,
    // so a shared entry would hand the second call the first one's "30px".
    expect(recipe({ size: "md", tone: "solid" })).toMatchObject({
      "@layer recipes": { marginTop: "30px" },
    })

    expect(recipe({ tone: "solid", size: "md" })).toMatchObject({
      "@layer recipes": { marginTop: "20px" },
    })
  })
})
