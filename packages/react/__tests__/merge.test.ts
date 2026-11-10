import { mergeWith } from "../src/utils/merge"

describe("mergeWith", () => {
  it("should not mutate sources when merging nested objects", () => {
    const a = { _hover: { color: "red" }, padding: { base: "1", md: "2" } }
    const b = { _hover: { background: "green" }, padding: { md: "4" } }
    const aSnapshot = structuredClone(a)
    const bSnapshot = structuredClone(b)

    const result = mergeWith({}, a, b)

    expect(result).toEqual({
      _hover: { color: "red", background: "green" },
      padding: { base: "1", md: "4" },
    })
    expect(a).toEqual(aSnapshot)
    expect(b).toEqual(bSnapshot)
  })

  it("should not alias arrays or objects nested in arrays", () => {
    const a = { items: [{ color: "red" }] }
    const b = { items: [{ background: "green" }, { color: "blue" }] }
    const aSnapshot = structuredClone(a)
    const bSnapshot = structuredClone(b)

    const result = mergeWith({}, a, b)

    expect(result).toEqual({
      items: [{ color: "red", background: "green" }, { color: "blue" }],
    })
    expect(a).toEqual(aSnapshot)
    expect(b).toEqual(bSnapshot)
  })

  it("should not share nested objects between the result and a source", () => {
    const a = { _hover: { color: "red" } }
    const result = mergeWith({}, a)

    result._hover.color = "blue"

    expect(a).toEqual({ _hover: { color: "red" } })
  })
})
