export function removeIndex<A>(array: A[], index: number) {
  return array.filter((_, idx) => idx !== index);
}

export function removeItem<A>(array: A[], item: A) {
  const itemIndex = array.indexOf(item);
  return removeIndex(array, itemIndex);
}

export function findIndex<A>(array: A[], callback: (item: A) => boolean) {
  const found = array.find(callback);
  if (found) return array.indexOf(found);
  return -1;
}

export function getNextIndex(
  index: number,
  itemCount: number,
  step = 1,
  loop = true,
) {
  const lastIndex = itemCount - 1;

  if (index === -1) {
    return step > 0 ? 0 : lastIndex;
  }

  const nextIndex = index + step;

  if (nextIndex < 0) {
    return loop ? lastIndex : 0;
  }

  if (nextIndex >= itemCount) {
    if (loop) return 0;
    return index > itemCount ? itemCount : index;
  }

  return nextIndex;
}

export function getPrevIndex(index: number, itemCount: number, loop = true) {
  return getNextIndex(index, itemCount, -1, loop);
}

export function arrayToMatrix<T>(items: T[], columnCount: number): T[][] {
  return items.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % columnCount === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
}

export function getNextItemFromSearch<T>(
  items: T[],
  searchString: string,
  itemToString: (item: T) => string,
  currentItem: T,
) {
  if (!searchString) return null;

  // If current value doesn't exist, find the item that match the search string
  if (!currentItem) {
    const foundItem = items.find(item =>
      itemToString(item)
        .toLowerCase()
        .startsWith(searchString.toLowerCase()),
    );
    return foundItem || currentItem;
  }

  // Filter items for ones that match the search string (case insensitive)
  const searchResults = items.filter(item =>
    itemToString(item)
      .toLowerCase()
      .startsWith(searchString.toLowerCase()),
  );

  // If there's a match, let's get the next item to select
  if (searchResults.length) {
    let nextIndex: number;

    // If the currentItem is in the available items, we move to the next available option
    if (searchResults.includes(currentItem)) {
      const currentIndex = searchResults.indexOf(currentItem);
      nextIndex = currentIndex + 1;
      if (nextIndex === searchResults.length) {
        nextIndex = 0;
      }
      return searchResults[nextIndex];
    } else {
      // Else, we pick the first item in the available items
      nextIndex = items.indexOf(searchResults[0]);
      return items[nextIndex];
    }
  }

  // a decent fallback to the currentItem
  return currentItem;
}
