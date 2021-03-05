import { css } from "../src"
import { createTheme } from "./theme"

test("should process sr-only", () => {
  const result = css({
    srOnly: true,
    _active: {
      srOnly: "focusable",
    },
  })(createTheme("ltr"))

  expect(result).toMatchInlineSnapshot(`
    Object {
      "&:active, &[data-active]": Object {
        "clip": "auto",
        "height": "auto",
        "margin": "0",
        "overflow": "visible",
        "padding": "0",
        "position": "static",
        "whiteSpace": "normal",
        "width": "auto",
      },
      "border": "0px",
      "clip": "rect(0, 0, 0, 0)",
      "height": "1px",
      "margin": "-1px",
      "overflow": "hidden",
      "padding": "0px",
      "position": "absolute",
      "whiteSpace": "nowrap",
      "width": "1px",
    }
  `)
})
