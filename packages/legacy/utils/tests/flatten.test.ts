import { flatten } from "../src"

describe("flatten", () => {
  it("should flatten an object", () => {
    const flatObject = flatten({ colors: { red: { 500: "#ff0000" } } }, 1)
    expect(flatObject).toMatchInlineSnapshot(`
      Object {
        "colors.red": Object {
          "500": "#ff0000",
        },
      }
    `)
  })

  it("should flatten an array", () => {
    const flatObject = flatten({ space: [0, 1, 2, 4, 8, 16, 32] }, 1)
    expect(flatObject).toMatchInlineSnapshot(`
      Object {
        "space.0": 0,
        "space.1": 1,
        "space.2": 2,
        "space.3": 4,
        "space.4": 8,
        "space.5": 16,
        "space.6": 32,
      }
    `)
  })
})
