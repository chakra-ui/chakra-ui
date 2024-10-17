export function scrollIntoView(
  container: HTMLElement,
  selected: HTMLElement,
  scrollPadding: number = 0,
): void {
  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents: HTMLElement[] = []
  let pointer = selected.offsetParent
  while (
    pointer !== null &&
    container !== pointer &&
    container.contains(pointer)
  ) {
    offsetParents.push(pointer as HTMLElement)
    pointer = (pointer as HTMLElement).offsetParent
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop + scrollPadding
  const viewRectBottom =
    container.scrollTop + container.clientHeight - scrollPadding

  if (top < viewRectTop) {
    container.scrollTop = top - scrollPadding
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight + scrollPadding
  }
}
