import { createTheme } from "./theme"
import { css } from "../src"

test("should expand css var token", () => {
  expect(
    css({
      "--banner-height": "sizes.sm",
      "--checkbox-disabled-color": "colors.pinkish",
      "&:disabled": {
        color: "var(--checkbox-disabled-color)",
      },
    })(createTheme("ltr")),
  ).toMatchInlineSnapshot(`
    Object {
      "&:disabled": Object {
        "color": "var(--checkbox-disabled-color)",
      },
      "--banner-height": "var(--sizes-sm)",
      "--checkbox-disabled-color": "var(--colors-pinkish)",
    }
  `)
})

test("should expand responsive css var token", () => {
  expect(
    css({
      //@ts-ignore Resolve this type @segunadebayo
      "--checkbox-disabled-color": ["colors.pinkish", "colors.redish"],
      "&:disabled": {
        color: "var(--checkbox-disabled-color)",
      },
    })(createTheme("ltr")),
  ).toMatchInlineSnapshot(`
    Object {
      "&:disabled": Object {
        "color": "var(--checkbox-disabled-color)",
      },
      "--checkbox-disabled-color": "var(--colors-pinkish)",
      "@media screen and (min-width: 40em)": Object {
        "--checkbox-disabled-color": "var(--colors-redish)",
      },
    }
  `)
})
