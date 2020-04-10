import { mapResponsive } from "../responsive"

const arr = [1, 2, 3]
const obj = { a: 1, b: 2, c: 3 }
const mapper = (item: number) => item += 1

test("should run mapper on array or object and return mapped data", () => {
  expect(mapResponsive(arr, mapper)).toStrictEqual([2, 3, 4]);
  expect(mapResponsive(obj, mapper)).toStrictEqual({ a: 2, b: 3, c: 4 })
})
