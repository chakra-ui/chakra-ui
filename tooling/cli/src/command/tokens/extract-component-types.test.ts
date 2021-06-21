import { extractComponentTypes } from "./extract-component-types"

describe("extract-component-types", () => {
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
