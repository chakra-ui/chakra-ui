import { extendTheme, withDefaultVariant } from "../src"

describe("Theme extension: withDefaultVariant", () => {
  it("should set a defaultVariant", () => {
    const customTheme = extendTheme(
      withDefaultVariant({ variant: "my-custom-variant" }),
    )

    expect(customTheme.components.Button.defaultProps.variant).toBe(
      "my-custom-variant",
    )
  })

  it("should allow overrides only mentioned components", () => {
    const customTheme = extendTheme(
      withDefaultVariant({
        variant: "my-custom-variant",
        components: ["Button", "Badge"],
      }),
    )

    expect(customTheme.components.Button.defaultProps.variant).toBe(
      "my-custom-variant",
    )
    expect(customTheme.components.Badge.defaultProps.variant).toBe(
      "my-custom-variant",
    )
    expect(customTheme.components.Alert.defaultProps.variant).not.toBe(
      "my-custom-variant",
    )
  })
})
