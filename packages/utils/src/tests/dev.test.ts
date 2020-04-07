// yarn utils test
import { mapResponsive } from "../dev"

test("mapResponsive - 'prop: [1, 2, 3], mapper: item => (item += 1)' should equal [ 2, 3, 4 ]", () => {
  expect(mapResponsive([1, 2, 3], item => (item += 1))).toStrictEqual([2, 3, 4])
})

test("mapResponsive - 'prop: { a: 1, b: 2, c: 3 }, mapper: item => (item += 1)' should equal { a: 2, b: 3, c: 4 }", () => {
  expect(
    mapResponsive({ a: 1, b: 2, c: 3 }, item => (item += 1)),
  ).toStrictEqual({ a: 2, b: 3, c: 4 })
})
