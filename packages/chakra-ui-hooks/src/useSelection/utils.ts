interface GetNextIndex {
  step?: number;
  currentIndex: number;
  itemsLength: number;
  loop: boolean;
}

export function getNextIndex({
  step = 1,
  currentIndex,
  itemsLength,
  loop,
}: GetNextIndex) {
  if (currentIndex === -1) {
    return step > 0 ? 0 : itemsLength - 1;
  }

  const nextIndex = currentIndex + step;
  if (nextIndex < 0) {
    return loop ? itemsLength - 1 : 0;
  }

  if (nextIndex >= itemsLength) {
    return loop ? 0 : itemsLength - 1;
  }

  return nextIndex;
}

export function getItemIndex<T>(items: T[], item: T) {
  if (item == null || items.length === 0) {
    return -1;
  }
  return items.indexOf(item);
}

export function getValue<T>(valueProp: T, valueState: T) {
  const isControlled = valueProp != null;
  const value = isControlled ? valueProp : valueState;
  return [value, isControlled] as [T, boolean];
}
