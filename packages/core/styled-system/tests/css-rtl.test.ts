import { css } from "../src"
import { createTheme } from "./theme"

test("RTL: should transform logical css properties", () => {
  const result = css({
    float: "left",
    marginStart: "sm",
    roundedStart: ["20px", "40px"],
    borderColor: "red",
    insetStart: "sm",
  })(createTheme("rtl"))

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "borderBottomRightRadius": "40px",
        "borderTopRightRadius": "40px",
      },
      "borderBottomRightRadius": "20px",
      "borderColor": "red",
      "borderTopRightRadius": "20px",
      "float": "right",
      "marginInlineStart": "var(--space-sm)",
      "right": "var(--space-sm)",
    }
  `)
})

test("can override logical properties", () => {
  const result = css({
    insetStart: "md",
    // inset-start is `right` in rtl, so let's override it
    right: "40px",
  })(createTheme("rtl"))
  expect(result).toMatchInlineSnapshot(`
    Object {
      "right": "40px",
    }
  `)
})

test("LTR: should transform logical css properties", () => {
  const result = css({
    float: "left",
    marginEnd: "sm",
    borderStartRadius: ["20px", "40px"],
    borderColor: "red",
  })(createTheme("ltr"))

  expect(result).toMatchInlineSnapshot(`
    Object {
      "@media screen and (min-width: 40em)": Object {
        "borderBottomLeftRadius": "40px",
        "borderTopLeftRadius": "40px",
      },
      "borderBottomLeftRadius": "20px",
      "borderColor": "red",
      "borderTopLeftRadius": "20px",
      "float": "left",
      "marginInlineEnd": "var(--space-sm)",
    }
  `)
})

test("should work after refactoring. hehe", () => {
  const result = css({
    mx: "40px",
    w: 0.4,
    bg: "pinkish",
  })(createTheme("ltr"))

  expect(result).toMatchInlineSnapshot(`
    Object {
      "background": "var(--colors-pinkish)",
      "marginInlineEnd": "40px",
      "marginInlineStart": "40px",
      "width": "40%",
    }
  `)
})
