import { getArrowStyles } from "../src/popper.utils"

describe("getArrowStyles", () => {
  const arrowSize = 4
  const baseExpected = {
    width: 4,
    height: 4,
    position: "absolute",
    transform: "rotate(45deg)",
  }

  test("Placement: auto", () => {
    const expected = {}

    expect(getArrowStyles({ placement: "auto", arrowSize })).toEqual(expected)
    expect(getArrowStyles({ placement: "auto-start", arrowSize })).toEqual(
      expected,
    )
    expect(getArrowStyles({ placement: "auto-end", arrowSize })).toEqual(
      expected,
    )
  })

  test("Placement: top", () => {
    const expected = {
      ...baseExpected,
      bottom: "-2px",
    }

    expect(getArrowStyles({ placement: "top", arrowSize })).toEqual(expected)
    expect(getArrowStyles({ placement: "top-start", arrowSize })).toEqual(
      expected,
    )
    expect(getArrowStyles({ placement: "top-end", arrowSize })).toEqual(
      expected,
    )
  })

  test("Placement: bottom", () => {
    const expected = {
      ...baseExpected,
      top: "-2px",
    }

    expect(getArrowStyles({ placement: "bottom", arrowSize })).toEqual(expected)
    expect(getArrowStyles({ placement: "bottom-start", arrowSize })).toEqual(
      expected,
    )
    expect(getArrowStyles({ placement: "bottom-end", arrowSize })).toEqual(
      expected,
    )
  })

  test("Placement: right", () => {
    const expected = {
      ...baseExpected,
      left: "-2px",
    }

    expect(getArrowStyles({ placement: "right", arrowSize })).toEqual(expected)
    expect(getArrowStyles({ placement: "right-start", arrowSize })).toEqual(
      expected,
    )
    expect(getArrowStyles({ placement: "right-end", arrowSize })).toEqual(
      expected,
    )
  })

  test("Placement: left", () => {
    const expected = {
      ...baseExpected,
      right: "-2px",
    }

    expect(getArrowStyles({ placement: "left", arrowSize })).toEqual(expected)
    expect(getArrowStyles({ placement: "left-start", arrowSize })).toEqual(
      expected,
    )
    expect(getArrowStyles({ placement: "left-end", arrowSize })).toEqual(
      expected,
    )
  })
})
