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
  return array.filter((eachItem) => eachItem !== item)
}

/**
 * Get the next index based on the current index and step.
 *
 * @param currentIndex the current index
 * @param length the total length or count of items
 * @param step the number of steps
 * @param loop whether to circle back once `currentIndex` is at the start/end
 */
export function getNextIndex(
  currentIndex: number,
  length: number,
  step = 1,
  loop = true,
) {
  const lastIndex = length - 1

  if (currentIndex === -1) {
    return step > 0 ? 0 : lastIndex
  }

  const nextIndex = currentIndex + step

  if (nextIndex < 0) {
    return loop ? lastIndex : 0
  }

  if (nextIndex >= length) {
    if (loop) return 0
    return currentIndex > length ? length : currentIndex
  }

  return nextIndex
}

/**
 * Get's the previous index based on the current index.
 * Mostly used for keyboard navigation.
 *
 * @param index - the current index
 * @param count - the length or total count of items in the array
 * @param loop - whether we should circle back to the
 * first/last once `currentIndex` is at the start/end
 */
export function getPrevIndex(currentIndex: number, count: number, loop = true) {
  return getNextIndex(currentIndex, count, -1, loop)
}

/**
 * Converts an array into smaller chunks or groups.
 *
 * @param array the array to chunk into group
 * @param size the length of each chunk
 */
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

/**
 * Gets the next item based on a search string
 *
 * @param items array of items
 * @param searchString the search string
 * @param itemToString resolves an item to string
 * @param currentItem the current selected item
 */
export function getNextItemFromSearch<T>(
  items: T[],
  searchString: string,
  itemToString: (item: T) => string,
  currentItem: T,
) {
  if (searchString == null) {
    return currentItem
  }

  // If current item doesn't exist, find the item that matches the search string
  if (!currentItem) {
    const foundItem = items.find((item) =>
      itemToString(item).toLowerCase().startsWith(searchString.toLowerCase()),
    )
    return foundItem
  }

  // Filter items for ones that match the search string (case insensitive)
  const matchingItems = items.filter((item) =>
    itemToString(item).toLowerCase().startsWith(searchString.toLowerCase()),
  )

  // If there's a match, let's get the next item to select
  if (matchingItems.length > 0) {
    let nextIndex: number

    // If the currentItem is in the available items, we move to the next available option
    if (matchingItems.includes(currentItem)) {
      const currentIndex = matchingItems.indexOf(currentItem)
      nextIndex = currentIndex + 1
      if (nextIndex === matchingItems.length) {
        nextIndex = 0
      }
      return matchingItems[nextIndex]
    } else {
      // Else, we pick the first item in the available items
      nextIndex = items.indexOf(matchingItems[0])
      return items[nextIndex]
    }
  }

  // a decent fallback to the currentItem
  return currentItem
}

/**
 * since breakpoints are defined as custom properties on an array, you may
 * `Object.keys(theme.breakpoints)` to retrieve both regular numeric indices
 * and custom breakpoints as string.
 *
 * This function returns true given a custom array property.
 */
export const isCustomBreakpoint = (maybeBreakpoint: string) =>
  Number.isNaN(Number.parseInt(maybeBreakpoint))
