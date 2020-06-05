import { getOppositePosition, getArrowStyles } from "../popper.utils"

describe("getOppositePosition", () => {
  test.each`
    direction   | opposite
    ${"top"}    | ${"bottom"}
    ${"bottom"} | ${"top"}
    ${"right"}  | ${"left"}
    ${"left"}   | ${"right"}
  `(
    `opposite position of $direction is $opposite`,
    ({ direction, opposite }) => {
      expect(getOppositePosition(direction)).toBe(opposite)
    },
  )
})

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

    expect(getArrowStyles("auto", arrowSize)).toEqual(expected)
    expect(getArrowStyles("auto-start", arrowSize)).toEqual(expected)
    expect(getArrowStyles("auto-end", arrowSize)).toEqual(expected)
  })

  test("Placement: top", () => {
    const expected = {
      ...baseExpected,
      bottom: "-2px",
    }

    expect(getArrowStyles("top", arrowSize)).toEqual(expected)
    expect(getArrowStyles("top-start", arrowSize)).toEqual(expected)
    expect(getArrowStyles("top-end", arrowSize)).toEqual(expected)
  })

  test("Placement: bottom", () => {
    const expected = {
      ...baseExpected,
      top: "-2px",
    }

    expect(getArrowStyles("bottom", arrowSize)).toEqual(expected)
    expect(getArrowStyles("bottom-start", arrowSize)).toEqual(expected)
    expect(getArrowStyles("bottom-end", arrowSize)).toEqual(expected)
  })

  test("Placement: right", () => {
    const expected = {
      ...baseExpected,
      left: "-2px",
    }

    expect(getArrowStyles("right", arrowSize)).toEqual(expected)
    expect(getArrowStyles("right-start", arrowSize)).toEqual(expected)
    expect(getArrowStyles("right-end", arrowSize)).toEqual(expected)
  })

  test("Placement: left", () => {
    const expected = {
      ...baseExpected,
      right: "-2px",
    }

    expect(getArrowStyles("left", arrowSize)).toEqual(expected)
    expect(getArrowStyles("left-start", arrowSize)).toEqual(expected)
    expect(getArrowStyles("left-end", arrowSize)).toEqual(expected)
  })
})
