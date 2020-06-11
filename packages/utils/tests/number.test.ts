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

test("should get next value of value after specified step", () => {
  expect(roundValueToStep(5, 2)).toStrictEqual("6")
})

test("should clamp value to specified minimum", () => {
  expect(clampValue(5, 6, 10)).toStrictEqual(6)
})
