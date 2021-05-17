import { extractComponentTypes } from "../src/command/tokens/extract-component-types"

describe("Extract Component Types", () => {
  it("should extract all component types", () => {
    const theme = {
      components: {
        TestComponent: {
          variants: {
            outline: {},
            unstyled: {},
          },
        },
      },
    }

    const componentTypes = extractComponentTypes(theme)

    expect(componentTypes).toMatchInlineSnapshot(`
      Object {
        "TestComponent": Object {
          "sizes": Array [],
          "variants": Array [
            "outline",
            "unstyled",
          ],
        },
      }
    `)
  })

  it("should handle empty variants or sizes", () => {
    const theme = {
      components: {
        TestComponent: {},
      },
    }

    const componentTypes = extractComponentTypes(theme)

    expect(componentTypes).toMatchInlineSnapshot(`
      Object {
        "TestComponent": Object {
          "sizes": Array [],
          "variants": Array [],
        },
      }
    `)
  })
})
