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

  it("should handle arbitrary component names", () => {
    const theme = {
      components: {
        "design-system/Button": {},
        "design-system_Button": {},
      },
    }

    const componentTypes = extractComponentTypes(theme)

    expect(componentTypes).toMatchInlineSnapshot(`
      Object {
        "design-system/Button": Object {
          "sizes": Array [],
          "variants": Array [],
        },
        "design-system_Button": Object {
          "sizes": Array [],
          "variants": Array [],
        },
      }
    `)
  })
})
