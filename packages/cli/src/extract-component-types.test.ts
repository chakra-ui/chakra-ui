import { extractComponentTypes } from "./extract-component-types.js"

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
{
  "TestComponent": {
    "sizes": [],
    "variants": [
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
{
  "TestComponent": {
    "sizes": [],
    "variants": [],
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
{
  "design-system/Button": {
    "sizes": [],
    "variants": [],
  },
  "design-system_Button": {
    "sizes": [],
    "variants": [],
  },
}
`)
  })
})
