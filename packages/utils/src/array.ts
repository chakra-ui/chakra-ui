export function getFirstItem<T>(array: T[]) {
  return array != null && array.length ? array[0] : undefined
}

export function getLastItem<T>(array: T[]) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export function getPrevItem<T>(index: number, array: T[], loop = true) {
  const prevIndex = getPrevIndex(index, array.length, loop)
  return array[prevIndex]
}

export function getNextItem<T>(index: number, array: T[], loop = true) {
  const nextIndex = getNextIndex(index, array.length, 1, loop)
  return array[nextIndex]
}

export function removeIndex<T>(array: T[], index: number) {
  return array.filter((_, idx) => idx !== index)
}

export function addItem<T>(array: T[], item: T) {
  return [...array, item]
}

export function removeItem<T>(array: T[], item: T) {
  return array.filter(eachItem => eachItem !== item)
}

export function getNextIndex(
  index: number,
  length: number,
  step = 1,
  loop = true,
) {
  const lastIndex = length - 1
  if (index === -1) return step > 0 ? 0 : lastIndex

  const nextIndex = index + step

  if (nextIndex < 0) return loop ? lastIndex : 0

  if (nextIndex >= length) {
    if (loop) return 0
    return index > length ? length : index
  }

  return nextIndex
}

export function getPrevIndex(index: number, count: number, loop = true) {
  return getNextIndex(index, count, -1, loop)
}

export function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % size === 0) {
      rows.push([currentValue])
    } else {
      rows[rows.length - 1].push(currentValue)
    }
    return rows
  }, [] as T[][])
}

export function getNextItemFromSearch<T>(
  items: T[],
  searchString: string,
  itemToString: (item: T) => string,
  currentItem: T,
) {
  if (!searchString) return null

  // If current value doesn't exist, find the item that match the search string
  if (!currentItem) {
    const foundItem = items.find(item =>
      itemToString(item)
        .toLowerCase()
        .startsWith(searchString.toLowerCase()),
    )
    return foundItem || currentItem
  }

  // Filter items for ones that match the search string (case insensitive)
  const searchResults = items.filter(item =>
    itemToString(item)
      .toLowerCase()
      .startsWith(searchString.toLowerCase()),
  )

  // If there's a match, let's get the next item to select
  if (searchResults.length) {
    let nextIndex: number

    // If the currentItem is in the available items, we move to the next available option
    if (searchResults.includes(currentItem)) {
      const currentIndex = searchResults.indexOf(currentItem)
      nextIndex = currentIndex + 1
      if (nextIndex === searchResults.length) {
        nextIndex = 0
      }
      return searchResults[nextIndex]
    } else {
      // Else, we pick the first item in the available items
      nextIndex = items.indexOf(searchResults[0])
      return items[nextIndex]
    }
  }

  // a decent fallback to the currentItem
  return currentItem
}
