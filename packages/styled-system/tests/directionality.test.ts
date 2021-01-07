import { Directionality } from "../src/utils/directionality"
import { createTheme } from "./theme"

describe("should map directional style", () => {
  test("single property", () => {
    const helper = new Directionality(createTheme("rtl"))
    const result = helper.getLogicalStyle({
      ltr: "left",
      rtl: "right",
      value: "8px",
    })
    expect(result).toMatchObject({
      right: "8px",
    })
  })

  test("multiple properties", () => {
    const helper = new Directionality(createTheme("rtl"))
    const result = helper.getLogicalStyle({
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"],
      value: "8px",
    })
    expect(result).toMatchObject({
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    })
  })
})
