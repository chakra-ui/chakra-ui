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

export function toMatrix<T>(items: T[], columnCount: number): T[][] {
  return items.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % columnCount === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
}
