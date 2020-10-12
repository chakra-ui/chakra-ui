import { getArrowStyles } from "../src/popper.utils"

describe("getArrowStyles", () => {
  const arrowSize = 4
  const baseExpected = {
    width: 4,
    height: 4,
  }

  test("Placement: top", () => {
    const expected = {
      ...baseExpected,
      bottom: -2,
      zIndex: -1,
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
      top: -2,
      zIndex: -1,
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
      left: -2,
      zIndex: -1,
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
      right: -2,
      zIndex: -1,
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
