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

  test("removeIndex - 'array: [1, 2, 3], index: 1' should equal [1,3]", () => {
    expect(removeIndex([1, 2, 3], 1)).toStrictEqual([1, 3])
  })

  test("addItem - 'array: [1, 2, 3], item: 4' should equal [1,2,3,4]", () => {
    expect(addItem([1, 2, 3], 4)).toStrictEqual([1, 2, 3, 4])
  })

  test("removeItem - 'array: [1, 2, 3], item: 3' should equal [1, 2]", () => {
    expect(removeItem([1, 2, 3], 3)).toStrictEqual([1, 2])
  })

  test("getNextIndex - 'index: 1, length: 4, step: 1' should equal 2", () => {
    expect(getNextIndex(1, 4, 1)).toStrictEqual(2)
  })

  test("getPrevIndex - 'index: 0, count: 5' should equal 4", () => {
    expect(getPrevIndex(0, 5)).toStrictEqual(4)
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
    item => item.value,
    currentItem,
  )
  expect(result).toEqual({ value: "Vue" })
})

test("chunk - 'array: [1, 2, 3, 4], size: 2' should equal [ [ 1, 2 ], [ 3, 4 ] ]", () => {
  expect(chunk([1, 2, 3, 4], 2)).toStrictEqual([
    [1, 2],
    [3, 4],
  ])
})

test("getNextItemFromSearch - 'items: ['Cheese', 'Butter', 'Ice cream'], searchString: ice, itemToString: (item) => (item.toString()), currentItem: Butter' should equal [ [ 1, 2 ], [ 3, 4 ] ]", () => {
  expect(
    getNextItemFromSearch(
      ["Cheese", "Butter", "Ice cream"],
      "ice",
      item => item.toString(),
      "Butter",
    ),
  ).toStrictEqual("Ice cream")
})
