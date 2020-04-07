import {
  toPrecision,
  countDecimalPlaces,
  valueToPercent,
  percentToValue,
  roundValueToStep,
  clampValue,
} from "../number"

test("toPrecision - 'value: 1.4567, precision: 2' should equal '1.46'", () => {
  expect(toPrecision(1.4567, 2)).toStrictEqual("1.46")
})

test("countDecimalPlaces - 'value: 1.4567' should equal 4", () => {
  expect(countDecimalPlaces(1.4567)).toStrictEqual(4)
})

test("valueToPercent - 'value: 5, min: 1, max: 11' should equal 50", () => {
  expect(valueToPercent(5, 0, 10)).toStrictEqual(50)
})

test("percentToValue - 'percent: 50, min: 0, max: 10' should equal 5", () => {
  expect(percentToValue(50, 0, 10)).toStrictEqual(500)
})

test("roundValueToStep - 'value: 5, step: 2' should equal '6'", () => {
  expect(roundValueToStep(5, 2)).toStrictEqual("6")
})

test("clampValue - 'value: 5, min: 6, max: 10' should equal 6", () => {
  expect(clampValue(5, 6, 10)).toStrictEqual(6)
})
