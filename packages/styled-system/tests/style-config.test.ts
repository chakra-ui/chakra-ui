import { recipe, theme } from "./theme"

test("should handle single variant", () => {
  expect(recipe({ theme, variant: "solid", size: ["sm", "md"] }))
    .toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 0px) and (max-width: 39.98em)": Object {
        "fontSize": "sm",
        "h": 8,
        "minW": 8,
        "px": 3,
      },
      "@media screen and (min-width: 40em)": Object {
        "fontSize": "md",
        "h": 10,
        "minW": 10,
        "px": 4,
      },
      "backgroundColor": "green.500",
      "borderRadius": "md",
      "color": "white",
      "fontWeight": "semibold",
      "lineHeight": "1.2",
    }
  `)

  expect(recipe({ theme, variant: "solid", size: { base: "sm", sm: "md" } }))
    .toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 0px) and (max-width: 39.98em)": Object {
        "fontSize": "sm",
        "h": 8,
        "minW": 8,
        "px": 3,
      },
      "@media screen and (min-width: 40em)": Object {
        "fontSize": "md",
        "h": 10,
        "minW": 10,
        "px": 4,
      },
      "backgroundColor": "green.500",
      "borderRadius": "md",
      "color": "white",
      "fontWeight": "semibold",
      "lineHeight": "1.2",
    }
  `)

  expect(recipe({ theme, variant: "solid", size: { base: "sm", lg: "md" } }))
    .toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 0px) and (max-width: 63.98em)": Object {
        "fontSize": "sm",
        "h": 8,
        "minW": 8,
        "px": 3,
      },
      "@media screen and (min-width: 64em)": Object {
        "fontSize": "md",
        "h": 10,
        "minW": 10,
        "px": 4,
      },
      "backgroundColor": "green.500",
      "borderRadius": "md",
      "color": "white",
      "fontWeight": "semibold",
      "lineHeight": "1.2",
    }
  `)
})

test("should work with distant breakpoint", () => {
  expect(
    recipe({
      theme,
      variant: "solid",
      size: { base: "sm", lg: "lg" },
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 0px) and (max-width: 63.98em)": Object {
        "fontSize": "sm",
        "h": 8,
        "minW": 8,
        "px": 3,
      },
      "@media screen and (min-width: 64em)": Object {
        "fontSize": "lg",
        "h": 12,
        "minW": 12,
        "px": 6,
      },
      "backgroundColor": "green.500",
      "borderRadius": "md",
      "color": "white",
      "fontWeight": "semibold",
      "lineHeight": "1.2",
    }
  `)

  expect(
    recipe({
      theme,
      variant: "solid",
      size: ["sm", null, null, "md"],
    }),
  ).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 0px) and (max-width: 63.98em)": Object {
        "fontSize": "sm",
        "h": 8,
        "minW": 8,
        "px": 3,
      },
      "@media screen and (min-width: 64em)": Object {
        "fontSize": "md",
        "h": 10,
        "minW": 10,
        "px": 4,
      },
      "backgroundColor": "green.500",
      "borderRadius": "md",
      "color": "white",
      "fontWeight": "semibold",
      "lineHeight": "1.2",
    }
  `)
})
