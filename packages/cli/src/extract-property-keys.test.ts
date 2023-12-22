import { extractPropertyKeys } from "./extract-property-keys.js"

describe("Extract Property Keys", () => {
  it("should extract top-level keys from the given property", () => {
    const theme = {
      textStyles: {
        styleOne: {
          fontSize: 16,
          fontWeight: "bold",
        },
        styleTwo: {
          fontSize: 64,
        },
      },
    }

    const textStyles = extractPropertyKeys(theme, "textStyles")
    expect(textStyles).toMatchInlineSnapshot(`
[
  "styleOne",
  "styleTwo",
]
`)
  })

  it("should handle empty entries", () => {
    const theme = {
      textStyles: {
        emptyStyle: {},
      },
    }

    const componentTypes = extractPropertyKeys(theme, "textStyles")

    expect(componentTypes).toMatchInlineSnapshot(`
[
  "emptyStyle",
]
`)
  })

  it("should handle missing properties", () => {
    const theme = {}

    const textStyles = extractPropertyKeys(theme, "textStyles")

    expect(textStyles).toMatchInlineSnapshot(`[]`)
  })
})
