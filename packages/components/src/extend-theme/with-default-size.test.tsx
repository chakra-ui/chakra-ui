import { extendTheme } from "./extend-theme"
import { withDefaultSize } from "./with-default-size"

describe("Theme extension: withDefaultSize", () => {
  it("should set a defaultSize", () => {
    const customTheme = extendTheme(withDefaultSize({ size: "veryBig" }))

    expect(customTheme.components.Button.defaultProps.size).toBe("veryBig")
  })

  it("should allow overrides only mentioned components", () => {
    const customTheme = extendTheme(
      withDefaultSize({
        size: "veryBig",
        components: ["Button", "Badge"],
      }),
    )

    expect(customTheme.components.Button.defaultProps.size).toBe("veryBig")
    expect(customTheme.components.Badge.defaultProps.size).toBe("veryBig")
    expect(customTheme.components.Alert.defaultProps.size).not.toBe("veryBig")
  })
})
