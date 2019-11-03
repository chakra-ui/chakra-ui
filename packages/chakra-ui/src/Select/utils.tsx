export function registerOption(items: any[], item: any) {
  if (items.length === 0) {
    return [item];
  }
  const index = items.findIndex(_item => _item.id === item.id);
  if (index >= 0) return items;

  const indexAfter = items.findIndex(
    _item =>
      !!(
        _item.ref.current &&
        item.ref.current &&
        item.ref.current.compareDocumentPosition(item.ref.current) &
          Node.DOCUMENT_POSITION_PRECEDING
      ),
  );

  if (indexAfter === -1) {
    return [...items, item];
  }

  return [...items.slice(0, indexAfter), item, ...items.slice(indexAfter)];
}
