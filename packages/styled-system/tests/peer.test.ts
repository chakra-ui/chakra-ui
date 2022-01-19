import { SystemStyleObject, css } from "../src"
import { createTheme } from "./theme"

test("should be resolve peer style", () => {
  const styles: SystemStyleObject = {
    bg: "redish",
    _peerChecked: {
      bg: "pinkish",
    },
  }

  expect(css(styles)(createTheme("ltr"))).toMatchInlineSnapshot(`
    Object {
      "[data-peer]:checked ~ &, [data-peer][data-checked] ~ &, .peer:checked ~ &, .peer[data-checked] ~ &": Object {
        "background": "var(--colors-pinkish)",
      },
      "background": "var(--colors-redish)",
    }
  `)
})
