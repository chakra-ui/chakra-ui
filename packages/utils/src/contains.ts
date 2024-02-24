export function contains(
  parent: HTMLElement | null,
  child: HTMLElement | null,
) {
  if (!parent) return false
  return parent === child || parent.contains(child)
}
