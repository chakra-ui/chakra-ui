import { extractPropertyKeys } from "../src/command/tokens/extract-property-keys"

describe("Extract Keys", () => {
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
      Array [
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
      Array [
        "emptyStyle",
      ]
    `)
  })

  it("should handle missing properties", () => {
    const theme = {}

    const textStyles = extractPropertyKeys(theme, "textStyles")

    expect(textStyles).toMatchInlineSnapshot(`Array []`)
  })
})
