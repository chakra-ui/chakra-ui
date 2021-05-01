import { walkObject } from "../src"

describe("walkObject", () => {
  it("should handle an object", () => {
    const target = {
      key: "original",
      nested: {
        nestedKey: "nestedOriginal",
      },
    }
    const replaceWith = "It's me"
    const result = walkObject(target, () => replaceWith)

    expect(result).toEqual({
      key: replaceWith,
      nested: {
        nestedKey: replaceWith,
      },
    })
  })

  it("should handle an array", () => {
    const target = [
      "very",
      "original",
      {
        nested: {
          nestedKey: "nestedOriginal",
        },
      },
    ]
    const replaceWith = "It's me"
    const result = walkObject(target, () => replaceWith)
    expect(result).toEqual([
      replaceWith,
      replaceWith,
      {
        nested: {
          nestedKey: replaceWith,
        },
      },
    ])
  })

  it("should handle a string", () => {
    const target = "original"
    const replaceWith = "It's me"
    const result = walkObject(target, () => replaceWith)
    expect(result).toBe(replaceWith)
  })

  it("should handle a number", () => {
    const target = 1
    const replaceWith = "It's me"
    const result = walkObject(target, () => replaceWith)
    expect(result).toBe(replaceWith)
  })
})
