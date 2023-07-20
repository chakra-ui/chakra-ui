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
): T | undefined {
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
    }
    // Else, we pick the first item in the available items
    nextIndex = items.indexOf(matchingItems[0])
    return items[nextIndex]
  }

  // a decent fallback to the currentItem
  return currentItem
}
