import {
  toPrecision,
  countDecimalPlaces,
  valueToPercent,
  percentToValue,
  roundValueToStep,
  clampValue,
} from "../src"

test("should round number to specific precision", () => {
  expect(toPrecision(1.4567, 2)).toStrictEqual("1.46")
})

test("should return number of decimal places", () => {
  expect(countDecimalPlaces(1.4567)).toStrictEqual(4)
})

test("should return percent of value in a specific range", () => {
  expect(valueToPercent(5, 0, 10)).toStrictEqual(50)
})

test("should return value of percent in a specific range", () => {
  expect(percentToValue(50, 0, 10)).toStrictEqual(500)
})

describe("should get next value of value after specified step", () => {
  test("with both even from & step", () => {
    expect(roundValueToStep(4, 0, 2)).toStrictEqual("4")
    expect(roundValueToStep(5, 0, 2)).toStrictEqual("6")
    expect(roundValueToStep(6, 0, 2)).toStrictEqual("6")
  })

  test("with both odd from & step", () => {
    expect(roundValueToStep(3, 3, 5)).toStrictEqual("3")
    expect(roundValueToStep(4, 3, 5)).toStrictEqual("3")
    expect(roundValueToStep(5, 3, 5)).toStrictEqual("3")
    expect(roundValueToStep(6, 3, 5)).toStrictEqual("8")
    expect(roundValueToStep(7, 3, 5)).toStrictEqual("8")
    expect(roundValueToStep(8, 3, 5)).toStrictEqual("8")
  })

  test("with odd from and even step", () => {
    expect(roundValueToStep(3, 1, 2)).toStrictEqual("3")
    expect(roundValueToStep(4, 1, 2)).toStrictEqual("5")
    expect(roundValueToStep(5, 1, 2)).toStrictEqual("5")
    expect(roundValueToStep(6, 1, 2)).toStrictEqual("7")
  })
})

test("should clamp value to specified minimum", () => {
  expect(clampValue(5, 6, 10)).toStrictEqual(6)
})
