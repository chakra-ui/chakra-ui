import {
  extractPropertyPaths,
  printUnionMap,
} from "../src/command/tokens/extract-property-paths"

describe("Extract Property Paths", () => {
  const target = {
    1: {
      11: {
        111: "",
        112: "",
      },
      12: {
        121: "",
        122: "",
        123: {
          231: "",
          232: "",
        },
      },
    },
    2: {
      21: "",
      22: "",
    },
  }

  it("should extract all property paths", () => {
    const maxDepth = 4

    const propertyPaths = extractPropertyPaths(target, maxDepth)

    expect(propertyPaths).toMatchInlineSnapshot(`
      Array [
        "1.11.111",
        "1.11.112",
        "1.12.121",
        "1.12.122",
        "1.12.123.231",
        "1.12.123.232",
        "2.21",
        "2.22",
      ]
    `)
  })

  it("should omit too deep keys", () => {
    const maxDepth = 3

    const propertyPaths = extractPropertyPaths(target, maxDepth)

    expect(propertyPaths).toMatchInlineSnapshot(`
      Array [
        "1.11.111",
        "1.11.112",
        "1.12.121",
        "1.12.122",
        "2.21",
        "2.22",
      ]
    `)
  })

  it("should print TS union", () => {
    const union = { key: ["value1", "value2"] }
    const strict = false

    const interfacePartial = printUnionMap(union, strict)

    expect(interfacePartial).toMatchInlineSnapshot(
      `"key: \\"value1\\" | \\"value2\\" | (string & {});"`,
    )
  })

  it("should print strict TS union", () => {
    const union = { key: ["value1", "value2"] }
    const strict = true

    const interfacePartial = printUnionMap(union, strict)

    expect(interfacePartial).toMatchInlineSnapshot(
      `"key: \\"value1\\" | \\"value2\\";"`,
    )
  })

  it("should print type (string & {}) for empty array", () => {
    const union = { key: [] }
    const strict = false

    const interfacePartial = printUnionMap(union, strict)

    expect(interfacePartial).toMatchInlineSnapshot(`"key: (string & {});"`)
  })

  it("should print type never for empty array in strict mode", () => {
    const union = { key: [] }
    const strict = true

    const interfacePartial = printUnionMap(union, strict)

    expect(interfacePartial).toMatchInlineSnapshot(`"key: never;"`)
  })
})
