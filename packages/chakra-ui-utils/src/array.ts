export function removeIndexFromArray<A>(array: A[], index: number) {
  return array.filter((_, idx) => idx !== index);
}

export function removeItemFromArray<A>(array: A[], item: A) {
  const itemIndex = array.indexOf(item);
  return removeIndexFromArray(array, itemIndex);
}

export function findIndex<A>(array: A[], callback: (item: A) => boolean) {
  const found = array.find(callback);
  if (found) {
    return array.indexOf(found);
  }
  return -1;
}
