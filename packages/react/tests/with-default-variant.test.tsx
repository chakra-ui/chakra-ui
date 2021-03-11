import defaultTheme from "@chakra-ui/theme"
import { extendTheme, withDefaultVariant } from "../src"

describe("withDefaultVariant", () => {
  it("should set a defaultVariant", () => {
    const customTheme = extendTheme(
      withDefaultVariant({ variant: "my-custom-variant" }),
      defaultTheme,
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
      defaultTheme,
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
