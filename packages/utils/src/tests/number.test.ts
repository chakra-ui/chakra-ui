// yarn utils test
import { getFirstItem } from "../array"

test("getFirstItem - first item of [1, 2, 3] should equal 1", () => {
  expect(getFirstItem([1, 2, 3])).toStrictEqual(1)
})
