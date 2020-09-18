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
  isCustomBreakpoint,
} from "../src"

const array = [1, 2, 3, 4, 5, 6, 7, 8]

describe("first or last item queries", () => {
  test("should get first item", () => {
    expect(getFirstItem(array)).toEqual(1)
  })

  test("should get last item", () => {
    expect(getLastItem(array)).toEqual(8)
  })
})

describe("previous item/index queries", () => {
  test("should loop if at the end", () => {
    const currentIndex = 0
    const result = getPrevItem(currentIndex, array)
    expect(result).toEqual(8)
  })

  test("should get previous item", () => {
    const currentIndex = 5
    const result = getPrevItem(currentIndex, array)
    expect(result).toEqual(5)
  })

  test("should get previous index given current index", () => {
    expect(getPrevIndex(0, 5)).toEqual(4)
  })
})

describe("remove and add operations", () => {
  test("should remove item at index", () => {
    const result = removeIndex(array, 1)
    expect(result).toEqual([1, 3, 4, 5, 6, 7, 8])
  })

  test("should remove item at index", () => {
    const result = removeIndex(array, 1)
    expect(result).toEqual([1, 3, 4, 5, 6, 7, 8])
  })

  test("should add new item to end of array", () => {
    const result = addItem(array, 9)
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  test("should add new item to end of array", () => {
    const result = addItem(array, 9)
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  test("should remove item from array", () => {
    const result = removeItem(array, 8)
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})

describe("next item or index queries", () => {
  test("should get the next index", () => {
    const currentIndex = 1
    const result = getNextIndex(currentIndex, array.length)
    expect(result).toEqual(2)
  })

  test("should get the next item based on current index", () => {
    const currentIndex = 1
    const result = getNextItem(currentIndex, array)
    expect(result).toEqual(3)
  })

  test("should loop index back to the start", () => {
    const currentIndex = 7
    const result = getNextIndex(currentIndex, array.length)
    expect(result).toEqual(0)
  })
})

describe("chunk array", () => {
  test("should chunk symmetric array into 2 groups", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8]
    const result = chunk(array, 4)
    expect(result).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ])
  })

  test("should chunk non-symmetric array into 2 groups", () => {
    const array = [1, 2, 3, 4, 5, 6, 7]
    const result = chunk(array, 4)
    expect(result).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7],
    ])
  })
})

test("get next item based on search", () => {
  const array = [{ value: "React" }, { value: "Vue" }, { value: "Svelte" }]
  const currentItem = { value: "React" }
  const result = getNextItemFromSearch(
    array,
    "vu",
    (item) => item.value,
    currentItem,
  )
  expect(result).toEqual({ value: "Vue" })
})

test.each([
  ["base", true],
  ["sm", true],
  ["md", true],
  ["lg", true],
  ["xl", true],
  ["xxl", true],
  ["custom", true],
  ["0", false],
  ["1", false],
  ["2", false],
  ["3", false],
  ["4", false],
  ["5", false],
])("given %s, returns %s", (given, expected) => {
  expect(isCustomBreakpoint(given)).toBe(expected)
})
