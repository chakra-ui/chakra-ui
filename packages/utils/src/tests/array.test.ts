import {
  getFirstItem,
  getLastItem,
  getPrevItem,
  getNextItem,
  removeIndex,
  addItem,
  removeItem,
  getNextIndex,
  getPrevIndex,
  chunk,
  getNextItemFromSearch,
} from "../array"

// yarn utils test
test("getFirstItem - first item of [1, 2, 3] should equal 1", () => {
  expect(getFirstItem([1, 2, 3])).toStrictEqual(1)
})

test("getLastItem - last item of [1, 2, 3] should equal 1", () => {
  expect(getLastItem([1, 2, 3])).toStrictEqual(3)
})

test("getPrevItem - previous item of index 1 in [1, 2, 3] should equal 1", () => {
  expect(getPrevItem(1, [1, 2, 3])).toStrictEqual(1)
})

test("getNextItem - next item of index 1 in [1, 2, 3] should equal 3", () => {
  expect(getNextItem(1, [1, 2, 3])).toStrictEqual(3)
})

test("removeIndex - array: [1, 2, 3], index: 1 should equal [1,3]", () => {
  expect(removeIndex([1, 2, 3], 1)).toStrictEqual([1, 3])
})

test("addItem - array: [1, 2, 3], item: 4 should equal [1,2,3,4]", () => {
  expect(addItem([1, 2, 3], 4)).toStrictEqual([1, 2, 3, 4])
})

test("removeItem - array: [1, 2, 3], item: 3 should equal [1, 2]", () => {
  expect(removeItem([1, 2, 3], 3)).toStrictEqual([1, 2])
})

test("getNextIndex - index: 1, length: 4, step: 1 should equal 2", () => {
  expect(getNextIndex(1, 4, 1)).toStrictEqual(2)
})

test("getPrevIndex - index: 0, count: 5 should equal 4", () => {
  expect(getPrevIndex(0, 5)).toStrictEqual(4)
})
