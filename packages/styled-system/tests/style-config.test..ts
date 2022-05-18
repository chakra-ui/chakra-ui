import { recipe, theme } from "./theme"

test("should handle single variant", () => {
  expect(recipe({ theme, variant: "solid", size: ["sm", "md"] }))
    .toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 0px) and (max-width: 39.9365em)": Object {
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
})
