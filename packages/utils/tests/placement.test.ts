import { getPlacement, Placement } from "../src/placement"

describe("getPlacement - RTL", () => {
  test("{ direction: rtl }", () => {
    const get = (placement: Placement) =>
      getPlacement(placement, { direction: "rtl" })

    // don't flip logical properties
    expect(get("top-start")).toBe("top-start")
    expect(get("top-end")).toBe("top-end")

    // flip physical properties
    expect(get("top-left")).toBe("top-right")
    expect(get("top-right")).toBe("top-left")
    expect(get("bottom-left")).toBe("bottom-right")
    expect(get("bottom-right")).toBe("bottom-left")
  })

  test('{ direction: "rtl", flipLogical: true }', () => {
    const get = (placement: Placement) =>
      getPlacement(placement, { direction: "rtl", flipLogical: true })
    expect(get("top-start")).toBe("top-end")
    expect(get("top-end")).toBe("top-start")
  })

  test.each([
    ["auto", "auto"],
    ["auto-start", "auto-end"],
    ["auto-end", "auto-start"],
    ["top", "top"],
    ["top-start", "top-end"],
    ["top-end", "top-start"],
    ["bottom", "bottom"],
    ["bottom-start", "bottom-end"],
    ["bottom-end", "bottom-start"],
    ["right", "left"],
    ["right-start", "left-start"],
    ["right-end", "left-end"],
    ["left", "right"],
    ["left-start", "right-start"],
    ["left-end", "right-end"],
  ])("convert %s to %s", (a: any, b) => {
    const val = getPlacement(a, { direction: "rtl", flipLogical: true })
    expect(val).toBe(b)
  })

  test("{ preserveLogical: false }", () => {
    const getRtl = (placement: Placement) =>
      getPlacement(placement, {
        direction: "rtl",
        preserveLogical: false,
      })
    const getLtr = (placement: Placement) =>
      getPlacement(placement, {
        direction: "ltr",
        preserveLogical: false,
      })

    expect(getRtl("top-end")).toBe("top-left")
    expect(getLtr("top-start")).toBe("top-left")

    expect(getRtl("start")).toBe("right")
    expect(getLtr("start")).toBe("left")
  })
})
